# Hướng dẫn kiểm tra các thuật toán mã hóa

## Cách chạy ứng dụng
1. Mở file `index.html` trong trình duyệt web
2. Click vào các link tương ứng với từng thuật toán mã hóa để mở form

## Hướng dẫn test từng thuật toán

### 1. Caesar Cipher
- **Input**: Chữ cái thường hoặc hoa
- **Key**: Số nguyên (0-25)
- **Ví dụ test**:
  - Input: "HELLO"
  - Key: 3
  - Kết quả mã hóa: "KHOOR"
  - Kết quả giải mã: "HELLO"

### 2. Railfence Cipher
- **Input**: Chữ cái thường hoặc hoa
- **Key**: Số nguyên (số đường ray)
- **Ví dụ test**:
  - Input: "HELLO WORLD"
  - Key: 3
  - Kết quả mã hóa: "HOREL OLWLD"
  - Kết quả giải mã: "HELLOWORLD"

### 3. Playfair Cipher
- **Input**: Chữ cái thường hoặc hoa (không có J)
- **Key**: Từ khóa (chữ cái)
- **Ví dụ test**:
  - Input: "HELLO"
  - Key: "KEY"
  - Kết quả mã hóa: "RIFFY"
  - Kết quả giải mã: "HELLO"

### 4. Vigenère Cipher
- **Input**: Chữ cái thường hoặc hoa
- **Key**: Từ khóa (chữ cái)
- **Ví dụ test**:
  - Input: "HELLO"
  - Key: "KEY"
  - Kết quả mã hóa: "RIJVS"
  - Kết quả giải mã: "HELLO"

## Lưu ý khi test
1. Tất cả các thuật toán đều tự động chuyển input thành chữ hoa
2. Các ký tự đặc biệt và số sẽ được giữ nguyên
3. Playfair Cipher:
   - Tự động thay thế 'J' bằng 'I'
   - Tự động thêm 'X' nếu độ dài input lẻ
4. Railfence Cipher:
   - Key phải lớn hơn 1
   - Khoảng trắng sẽ bị loại bỏ
5. Vigenère Cipher:
   - Key sẽ được lặp lại nếu ngắn hơn input
   - Chỉ mã hóa các chữ cái, giữ nguyên các ký tự khác

## Các trường hợp test đặc biệt
1. Input rỗng
2. Key không hợp lệ
3. Input chứa ký tự đặc biệt
4. Input chứa số
5. Input chứa khoảng trắng
6. Key quá dài
7. Key quá ngắn 