# Binar Car Rental - Challenge 4

## Pages Implemented
- Landing page
- Find car

## How to Run
- Execute command `npm i` to install required libraries
- Execute command `npm run dev` to run the server in development mode or `npm start` to build and run the server.
- To run on docker, execute the following command:
```
docker build -t binar-car-rental .
docker run -p 3000:3000 binar-car-rental
```

## Endpoints
### Frontend
| No | URI              | Description                              |
| -- | ---------------- | ---------------------------------------- |
| 1  | /                | Landing page                             |
| 2  | /cars            | Find car                                 |