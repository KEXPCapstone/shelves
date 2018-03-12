# This script will create a list of albums from
# KEXP Vinyl MusicBrainz Collection which are also stored in Dalet
# From this list, we will select albums to photograph
# with preference given to albums in the top 1000 albums played by KEXP
# and KEXP's local music category
import requests
import json
import csv
import math

import math

def roundup(x):
    return int(math.ceil(x / 100.0)) * 100

musicbrainz_api = 'https://musicbrainz.org/ws/2/'

# parse the csv into a python dict list
reader = csv.DictReader(open("KEXPTop1000.csv"))
top_albums = []
for line in reader:
    top_albums.append(line)
for album in top_albums:
    if album['Album'] == 'Nevermind':
        print(album['Album'])

# get list of KEXP_VINYL collection ids
params = dict(
    fmt='json',
    editor='kexp_vinyl'
)
resp = requests.get(url='https://musicbrainz.org/ws/2/collection', params=params)
data = resp.json()

albums_to_photograph = []

# for each MB vinyl collection
for collection in data['collections']:
    print('Checking new KEXP vinyl collection: ' + collection['name'])
    release_count = collection['release-count']
    releases = []
    # MB limits results to 100 releases, so we have to make offset requests for full collections
    for i in range(0, release_count, 100):
        # get the list of releases in this collection (for this page)
        params = dict(
            fmt='json',
            collection=collection['id'],
            limit='100',
            offset=str(i),
            inc='artist-credits'
        )
        resp = requests.get(url='https://musicbrainz.org/ws/2/release', params=params)
        collection_data = resp.json()
        releases.extend(collection_data['releases'])
    print(str(collection_data['release-count']) + ' releases expected')
    print('fetched ' + str(len(releases)) + ' in this collection')
    for release in releases:
        for album in top_albums:
            if str(release['title'].lower().encode('utf8')) == str(album['Album'].lower()):
                albums_to_photograph.append(release['title'])
print("{0} albums to photograph".format(len(albums_to_photograph)))