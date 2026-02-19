from abc import ABC, abstractmethod


class Bird(ABC):
    pass


class FlyingBird(Bird):
    @abstractmethod
    def fly(self):
        pass


class Sparrow(FlyingBird):
    def fly(self):
        print("Flying")


class Penguin(Bird):
    def swim(self):
        print("Swimming")
