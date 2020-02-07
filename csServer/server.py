from flask import Flask, render_template, request, jsonify
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier

app = Flask(__name__)
def getData(region):
    data = pd.read_csv("results.csv") 
    data['Map'] = data['Map'].replace("d2", "Dust2").replace("inf", "Inferno").replace("mrg", "Mirage").replace("nuke", "Nuke").replace("ovp", "Overpass").replace("trn", "Train").replace("vtg", "Vertigo").replace("cch", "Cache")
    data = data.reindex(index=data.index[::-1])
    data = data[data.Date != 'No Date']
    data.Date = pd.to_datetime(data.Date)
    data = data[data.Competition.str.contains(region)]
    return(data)

def getRegionalData(region):
    data = getData(region)
    team1Data = data[['Date', 'Team1', 'Team 1 Score', 'Total Rounds', 'Map']]
    team1Data.columns = ['Date', 'Team', 'Team Score', 'Total Rounds', 'Map']
    team2Data = data[['Date', 'Team2', 'Team 2 Score', 'Total Rounds', 'Map']]
    team2Data.columns = ['Date', 'Team', 'Team Score', 'Total Rounds', 'Map']

    teamData = team1Data.append(team2Data)
    aggTeamData = teamData.groupby("Team").sum() 
    aggTeamData['Ratio'] = aggTeamData['Team Score']/aggTeamData['Total Rounds']
    aggTeamData = aggTeamData.reset_index()

    # aggTeamData.to_csv("/content/drive/My Drive/codejam/teams.csv", index = None)
    return(aggTeamData.to_json(orient='records'))

def runModel(region):
    data=getData(region)
    scoreData = data[['Team 1 Score', 'Team 2 Score']]
    scoreData[scoreData['Team 1 Score'] >= scoreData['Team 2 Score']] = 1
    scoreData[scoreData['Team 1 Score'] < scoreData['Team 2 Score']] = 0
    y_train = scoreData['Team 1 Score']

    y = scoreData['Team 1 Score']

    teamArray = [" ".join(item) for item in (data[['Team1', 'Team2']]).to_numpy().astype(str)]


    vectorizer = CountVectorizer()
    vectorizer.fit(teamArray)
    team1Dum = vectorizer.transform(data['Team1'])
    team2Dum = vectorizer.transform(data['Team2'])

    mapDummies = pd.get_dummies(data.Map)

    X = np.hstack((team1Dum.toarray(), team2Dum.toarray(), mapDummies))

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.05, shuffle=False)

    clf = LogisticRegression().fit(X_train, y_train)
    clf.fit(X_train, y_train)  
    accuracy = accuracy_score(y_test, clf.predict(X_test))
    return([clf, vectorizer, accuracy])

def predict(region, team1, team2, map_):
    data = getData(region)
    clf = runModel(region)[0]
    vectorizer = runModel(region)[1]
    X1 = vectorizer.transform([team1])
    X2 = vectorizer.transform([team2])
    num = {
        "Cache": 1,
        "Dust2": 3,
        "Inferno": 4,
        "Mirage": 5,
        'Nuke': 6,
        'Overpass': 7,
        'Train': 8,
        'Vertigo': 9
    }
    
    mapDummies = np.zeros(10)
    mapDummies[num[map_]] = 1

    X = np.hstack((X1.toarray(), X2.toarray(), [mapDummies]))
    y_pred = clf.predict(X)
    return(str(y_pred))



@app.route("/getAllData", methods=['GET'])
def getAllData():
    return("hello world")
@app.route("/data/region/america")
def getAmericanData():
    return(getRegionalData("America"))
@app.route("/data/region/europe")
def getEuropeData():
    return(getRegionalData("Europe"))
@app.route("/data/region/asia")
def getAsiaData():
    return(getRegionalData("Asia"))
@app.route('/prediction/game', methods=['POST'])
def prediction():
    map_ = request.get_json()['map']
    region = request.get_json()['region']
    team1 = request.get_json()['team1']
    team2 = request.get_json()['team2']
    
    # teams=" ".join([team1, team2])
    return(predict(region, team1, team2, map_))
@app.route('/prediction/accuracy', methods=['POST'])
def modelAccuracy():
    region = request.get_json()['region']

    return(str(runModel(region)[2]))


if __name__ == '__main__':
    app.run()

