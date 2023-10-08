# CSV Bulk Upload

> Estimated time: 3.5 hours

## Plan:

- Have a React frontend application that will be served at / using MUI
- Frontend will have a csv uploader and products list table, csv template download
- Backend API will have two endpoints /api/v1/purchase-orders/bulk-insert and /api/v1/purchase-orders/list
- Database will be MySQL with a startup script that generates the `purchase-orders` table
- Docker compose will be utilized to launch the application at http://localhost:3000 
- Unit tests for React components, unit tests for backend functions
