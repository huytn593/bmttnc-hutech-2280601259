class RailFenceCipher:
    def __init__(self):
        pass

    def rail_fence_encrypt(self, plain_text, num_rails):
        if num_rails == 1:
            return plain_text

        rails = [[] for _ in range(num_rails)]
        rail_index = 0
        direction = 1  # 1: down, -1: up

        for char in plain_text:
            rails[rail_index].append(char)
            if rail_index == 0:
                direction = 1
            elif rail_index == num_rails - 1:
                direction = -1
            rail_index += direction

        cipher_text = ''.join(''.join(rail) for rail in rails)
        return cipher_text

    def rail_fence_decrypt(self, cipher_text, num_rails):
        if num_rails == 1:
            return cipher_text

        # Create empty rails to mark positions
        rails = [[] for _ in range(num_rails)]
        rail_lengths = [0] * num_rails
        rail_index = 0
        direction = 1

        # Calculate lengths of each rail
        for _ in cipher_text:
            rail_lengths[rail_index] += 1
            if rail_index == 0:
                direction = 1
            elif rail_index == num_rails - 1:
                direction = -1
            rail_index += direction

        # Fill the rails with characters from cipher_text based on calculated lengths
        current_char_index = 0
        for i in range(num_rails):
            rails[i] = list(cipher_text[current_char_index:current_char_index + rail_lengths[i]])
            current_char_index += rail_lengths[i]

        # Reconstruct the plain_text by traversing the rails in zig-zag order
        plain_text = []
        rail_index = 0
        direction = 1
        start = 0  # Not used in this specific decrypt method from images, but for clarity

        for _ in range(len(cipher_text)):
            plain_text.append(rails[rail_index].pop(0))
            if rail_index == 0:
                direction = 1
            elif rail_index == num_rails - 1:
                direction = -1
            rail_index += direction

        return "".join(plain_text)