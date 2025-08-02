FROM node:18

# Tạo thư mục app trong container
WORKDIR /app

# Copy package.json và lock
COPY package*.json ./

# Cài dependency
RUN npm install

# Copy toàn bộ project vào container (trừ .dockerignore nếu có)
COPY . .

# Cài thêm nếu bạn dùng dotenv trong index.js
RUN npm install dotenv

# Expose cổng từ biến môi trường hoặc mặc định
EXPOSE 8080

# Lệnh chạy app
CMD ["npm", "start"]
