import os
from dotenv import load_dotenv

load_dotenv()

my_secret_key = os.getenv("SECRET_KEY")

def myEnvironment():
    print(f'My secret key is: {my_secret_key}.')

if __name__ == "__main__":
    myEnvironment()