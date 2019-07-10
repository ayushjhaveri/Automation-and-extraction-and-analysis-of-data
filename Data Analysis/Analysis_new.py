#!/usr/bin/env python
# coding: utf-8

# # We will analyse tickets issuewise by comparing the ticket data in the last 15 days with ticket data of all days

# In[39]:


#Importing Libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import datetime as dt
import mysql.connector as sql


# In[40]:


#convert mysql to pandas
#db_connection = sql.connect(host='localhost',database='freshdb',user='newuser',password='q1w2e3r4')
#df=pd.read_sql('SELECT * FROM ticket_log2',con=db_connection)


# In[48]:


#Importing from the main 7 month data
df=pd.read_csv('43000116426_tickets-June-11-2019-06_20.csv',low_memory=False)


# In[49]:


#Converting to datetime format
df['Created time'] = pd.to_datetime(df['Created time'])
df['Due by Time'] = pd.to_datetime(df['Due by Time'])
df['Resolved time']=pd.to_datetime(df['Resolved time'])
df['Closed time']=pd.to_datetime(df['Closed time'])


# In[50]:


#Adding the time differences
df['Due Time Left'] = df['Due by Time'] -df['Created time'] 
df['Resolved Time Taken'] = df['Resolved time'] -df['Created time'] 
df['Closed Time Taken'] = df['Closed time'] -df['Created time']


# In[51]:


#Converting to hours
df['Resolved Time Taken']=df['Resolved Time Taken']/np.timedelta64(1,'h')
df['Closed Time Taken']=df['Closed Time Taken']/np.timedelta64(1,'h')
df['Due Time Left']=df['Due Time Left']/np.timedelta64(1,'h')


# In[52]:


df.info()


# In[55]:


#dataframes into recent and old
df1=df[(np.datetime64('now')-df['Created time'])/np.timedelta64(1,'D')>=45]
df2=df[(np.datetime64('now')-df['Created time'])/np.timedelta64(1,'D')<45]


# In[56]:


#old data grouping
analysis_old=df1.groupby(
    ['Issue Sub Category']
).agg(
    {'Resolved Time Taken':'mean',
    'Closed Time Taken':'mean',
     'Due Time Left':'mean'
    }
)
analysis_old.fillna(0.0,inplace=True)

#new data grouping
analysis_new=df2.groupby(
    ['Issue Sub Category']
).agg(
    {'Resolved Time Taken':'mean',
    'Closed Time Taken':'mean',
     'Due Time Left':'mean'
    }
)
#analysis_new.fillna(0.0,inplace=True)


# In[57]:


#merging old and new issues
df3=pd.merge(analysis_new,analysis_old,on='Issue Sub Category',how='left')


# In[58]:


#Plotting the graph
ax = plt.subplots(figsize=(18,5))
df3['Resolved Time Taken_x'].plot(kind='bar',width=.5)
df3['Resolved Time Taken_y'].plot(secondary_y=False)
plt.ylabel('Average Resolving Time(in hours)')
plt.xticks(rotation=90)
plt.savefig('Aanalysis.png')


# In[ ]:




