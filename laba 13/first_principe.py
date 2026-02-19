class Order:
    def __init__(self, items):
        self.items = items

    def calculate_total(self):
        return sum(self.items)


class OrderRepository:
    def save(self, order: Order):
        print("Saving order to database")


class EmailService:
    def send_order_confirmation(self, order: Order):
        print("Sending email confirmation")

