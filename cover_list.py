# This script will create a list of albums from
# KEXP Vinyl MusicBrainz Collection which are also stored in Dalet
# From this list, we will select albums to photograph
# with preference given to albums in the top 1000 albums played by KEXP
# and KEXP's local music category
import requests
import json

musicbrainz_api = 'https://musicbrainz.org/ws/2/'

# get list of KEXP_VINYL collection ids
params = dict(
    fmt='json',
    editor='kexp_vinyl'
)
resp = requests.get(url='https://musicbrainz.org/ws/2/collection', params=params)
data = resp.json()
for collection in data['collections']:
    params = dict(
        fmt='json',
        collection=collection['id']
    )
    resp = requests.get(url='https://musicbrainz.org/ws/2/release', params=params)
    collection_data = resp.json()
    for release in collection_data['releases']:
        print(release['title'])
# get list of all albums in all KEXP_VINYL collections
r = requests.get(musicbrainz_api)
# for each album in vinyl collection
# check if there is a version of it in Dalet (by artist/title, or release-group lookup)
# if in Dalet && (KEXPcategory==local or in top 1000)
# add to photo list
# return photo list