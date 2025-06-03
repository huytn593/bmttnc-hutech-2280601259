from flask import Flask, render_template, request
from cipher.caesar import CaesarCipher

app = Flask(__name__)

# Route for home page
@app.route("/")
def home():
    return render_template('index.html')

# Route for Caesar Cipher page
@app.route("/caesar")
def caesar():
    return render_template('caesar.html')

# Route for Caesar Cipher encryption
@app.route("/encrypt", methods=['POST'])
def caesar_encrypt():
    text = request.form['inputPlainText']
    key = int(request.form['inputKeyPlain'])
    caesar = CaesarCipher()
    encrypted_text = caesar.encrypt_text(text, key)
    return f"text: {text}<br/>key: {key}<br/>encrypted text: {encrypted_text}"

# Route for Caesar Cipher decryption
@app.route("/decrypt", methods=['POST'])
def caesar_decrypt():
    text = request.form['inputCipherText']
    key = int(request.form['inputKeyCipher'])
    caesar = CaesarCipher()
    decrypted_text = caesar.decrypt_text(text, key)
    return f"text: {text}<br/>key: {key}<br/>decrypted text: {decrypted_text}"

# Main function to run the app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050, debug=True)
