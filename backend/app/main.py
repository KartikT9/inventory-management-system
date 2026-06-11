from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

from .database import engine
from .models import Product, Customer, Order

from .routes.products import router as product_router
from .routes.customers import router as customer_router
from .routes.orders import router as order_router

Order.metadata.create_all(bind=engine)
Product.metadata.create_all(bind=engine)
Customer.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://inventory-frontend-4qdp.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product_router)
app.include_router(customer_router)
app.include_router(order_router)

@app.get("/")
def home():
    return {
        "message": "Inventory API Running"
    }