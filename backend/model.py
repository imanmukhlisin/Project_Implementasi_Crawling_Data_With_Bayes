import math
import re

training_data = {
    'positif': {'liverpool': 2, 'juara': 1, 'liga': 2, 'inggris': 2},
    'negatif': {'kalah': 1, 'buruk': 1},
    'netral': {'main': 1, 'tim': 1}
}
doc_counts = {'positif': 2, 'negatif': 1, 'netral': 1}
total_docs = sum(doc_counts.values())

# 1. Hitung prior probabilitas untuk tiap kelas
prior_probs = {cls: doc_counts[cls] / total_docs for cls in doc_counts}

# Hitung total kata per kelas dan vocab
total_terms = {cls: sum(words.values()) for cls, words in training_data.items()}
vocab = set()
for terms in training_data.values():
    vocab.update(terms.keys())
V = len(vocab)

def preprocess(text):
    # Case folding
    text = text.lower()
    text = re.sub(r'http\S+', '', text)             
    text = re.sub(r'@\w+', '', text)               
    text = re.sub(r'#\w+', '', text)                 
    text = re.sub(r'\d+', '', text)                 
    text = re.sub(r'[^a-z\s]', '', text)            
    text = re.sub(r'\s+', ' ', text).strip()         
    tokens = text.split()

    # Stopword removal
    stopwords = set([
        'yang', 'dan', 'di', 'ke', 'dari', 'untuk', 'pada', 'adalah', 'itu', 'ini', 'sebagai', 'dengan', 'atau', 'juga', 'oleh', 'karena', 'saat', 'dalam', 'pada', 'sebuah', 'lebih', 'agar', 'bagi', 'akan', 'tidak', 'ada', 'sudah', 'telah', 'masih', 'oleh', 'pada', 'dapat', 'setelah', 'seperti', 'bisa', 'namun', 'hanya', 'saja'
    ])
    tokens = [t for t in tokens if t not in stopwords]

    # Normalisasi
    normalisasi = {
        'gk': 'tidak',
        'nggak': 'tidak',
        'ga': 'tidak',
        'tdk': 'tidak',
        'dr': 'dari',
        'tp': 'tapi',
        'sm': 'sama',
        'sy': 'saya',
        'dlm': 'dalam',
        'utk': 'untuk',
        'pd': 'pada',
        'lg': 'lagi',
        'aja': 'saja',
        'blm': 'belum',
        'sdh': 'sudah',
        'udh': 'sudah',
        'bgt': 'banget',
        'bgtu': 'begitu'
    }
    tokens = [normalisasi.get(t, t) for t in tokens]

    # Stemming 
    def stemmer(word):
        for suf in ['lah', 'kah', 'ku', 'mu', 'nya', 'pun', 'i', 'kan', 'an']:
            if word.endswith(suf):
                return word[:-len(suf)]
        return word
    tokens = [stemmer(t) for t in tokens]

    return tokens

def get_term_prob(term, cls):
    # 2. Hitung likelihood tiap kata dengan Laplace smoothing
    # P(Xi|Vj) = (count(Xi in Vj) + 1) / (total kata Vj + |Vocab|)
    return (training_data[cls].get(term, 0) + 1) / (total_terms[cls] + V)

def classify(tweet):
    # 1. Ekstraksi fitur: ubah tweet jadi list kata
    tokens = preprocess(tweet)
    probs = {}
    # 3. Hitung skor total untuk tiap kelas
    for cls in training_data:
        # Mulai dari prior
        prob = prior_probs[cls]
        # Kalikan dengan likelihood tiap kata
        for token in tokens:
            prob *= get_term_prob(token, cls)
        probs[cls] = prob
    # 4. Normalisasi probabilitas agar total = 1
    total_prob = sum(probs.values())
    vmap = {cls: (probs[cls] / total_prob) if total_prob > 0 else 0 for cls in probs}
    # 5. Ambil kelas dengan nilai tertinggi (VMAP)
    pred = max(vmap, key=vmap.get)
    clean_tweet = ' '.join(tokens)
    return pred, vmap, clean_tweet