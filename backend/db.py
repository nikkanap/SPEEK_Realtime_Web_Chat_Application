import os

from dotenv import load_dotenv 
from psycopg2.pool import ThreadedConnectionPool

# loading the database information from the .env file
load_dotenv()

# getting the data from the database through the config file
pool = ThreadedConnectionPool(
    minconn=1,
    maxconn=10,
    dbname=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),  
    password=os.getenv("DB_PASSWORD"),
    host=os.getenv("DB_HOST"),
    port=int(os.getenv("DB_PORT"))
)

##### DATABASE #####
# modify this later AFTER creating signup page that has hashed passwords
def runQuery(query, params=None, fetch=True):
    # Get a connection to the db
    db_connection = pool.getconn()

    # returning values
    success = False
    data = ()

    try:
        with db_connection.cursor() as cursor:
            cursor.execute(query, params)

            if fetch: # if we need to get any results
                data = cursor.fetchall() or ()
            
            # if no results
            db_connection.commit()
            success = True # if successful, then we set success to true

    except Exception as e:
        db_connection.rollback()
        print('An exception occurred', e)
        raise # raise the exception

    finally:
        # give the connection back regardless of results
        pool.putconn(db_connection)

        # return a dict
        return {
            "data" : data,
            "success" : success
        } 
