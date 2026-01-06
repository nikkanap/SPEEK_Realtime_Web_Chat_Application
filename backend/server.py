import pg8000 # type: ignore
from dotenv import load_dotenv # type: ignore
import os

load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_PORT = int(os.getenv("DB_PORT", 5432)) #if waray, use 5432

print(DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_PORT)


db_connection = None
try:
    db_connection = pg8000.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        port=DB_PORT
    )
    print("Connection successful!")

    cursor = db_connection.cursor()
    query = "SELECT * FROM users;"
    cursor.execute(query)
    records = cursor.fetchall()

    print("Users: ")
    for record in records:
        print(record)
    
    cursor.close()

except Exception as e:
    print("An error has occured while trying to connect to the database: ", e)
finally:
    if db_connection:
        db_connection.close()