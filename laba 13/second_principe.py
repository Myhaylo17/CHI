from abc import ABC, abstractmethod


class PaymentMethod(ABC):
    @abstractmethod
    def pay(self):
        pass


class CardPayment(PaymentMethod):
    def pay(self):
        print("Paying by card")


class PayPalPayment(PaymentMethod):
    def pay(self):
        print("Paying by PayPal")


class PaymentProcessor:
    def pay(self, payment_method: PaymentMethod):
        payment_method.pay()
