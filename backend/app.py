from flask import Flask, request, jsonify
from flask_cors import CORS
from model import preprocess, classify
import snscrape.modules.twitter as sntwitter
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route('/preprocess', methods=['POST'])
def preprocess_route():
    data = request.get_json()
    tweet = data.get('tweet', '')
    tokens = preprocess(tweet)
    return jsonify({'clean_tokens': tokens, 'clean_tweet': ' '.join(tokens)})

@app.route('/classify', methods=['POST'])
def classify_route():
    data = request.get_json()
    tweet = data.get('tweet', '')
    # Pastikan classify() menggunakan model/fitur yang sudah diekstraksi
    pred, vmap, clean_tweet = classify(tweet)
    return jsonify({
        'tweet': tweet,
        'clean_tweet': clean_tweet,
        'sentiment': pred,
        'probabilities': vmap
    })

@app.route('/crawl', methods=['POST'])
def crawl_route():
    data = request.get_json()
    hashtag = data.get('hashtag', '').lower().replace('#', '')
    jumlah = int(data.get('jumlah', 10))
    try:
        df = pd.read_csv('data_tweet.csv')
        print("Kolom CSV:", df.columns)
        if not all(col in df.columns for col in ['ID', 'Date', 'Content']):
            raise Exception(f"Kolom CSV tidak lengkap: {df.columns}")
        filtered = df[df['Content'].str.lower().str.contains(hashtag, na=False)]
        tweets = []
        for _, row in filtered.head(jumlah).iterrows():
            tweets.append({
                'id': str(row['ID']),
                'date': str(row['Date']),
                'content': row['Content']
            })
        print("Jumlah hasil:", len(tweets))
        return jsonify({'tweets': tweets})
    except Exception as e:
        import traceback
        print('ERROR:', e)
        traceback.print_exc()
        return jsonify({'error': str(e), 'tweets': []}), 500
if __name__ == '__main__':
    app.run(debug=True)