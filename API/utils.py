# app/utils.py
import sqlite3
import os

basedir = os.path.abspath(os.path.dirname(__file__))



# connect to the datase 
def get_database_connection():
    try:
        conn = sqlite3.connect('API\\tsrd_poject.db')
        return conn
    except Exception as e:
        print('There was an error connecting to the database',e)
        return
    


