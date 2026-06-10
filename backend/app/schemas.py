from pydantic import BaseModel
from pydantic import EmailStr


class ProductCreate(BaseModel):
    name: str
    sku: str
    price: float
    quantity: int


class CustomerCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str

class OrderCreate(BaseModel):
    customer_id: int
    product_id: int
    quantity: int