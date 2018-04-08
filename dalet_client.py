import json
from suds.client import Client
from suds.wsse import Security, UsernameToken
from suds.plugin import MessagePlugin

SOAP_SERVER = 'dalet-mig-1.kexp.org' # does the dalet-test-2 server work for this?
SOAP_PORT = 8081

security = Security()
token = UsernameToken('', '')
security.tokens.append(token)

def basic_sobject_to_dict(obj):
    """Converts suds object to dict very quickly.
    Does not serialize date time or normalize key case.
    :param obj: suds object
    :return: dict object
    """
    if not hasattr(obj, '__keylist__'):
        return obj
    data = {}
    fields = obj.__keylist__
    for field in fields:
        val = getattr(obj, field)
        if isinstance(val, list):
            data[field] = []
            for item in val:
                data[field].append(basic_sobject_to_dict(item))
        else:
            data[field] = basic_sobject_to_dict(val)
    return data


def sobject_to_dict(obj, key_to_lower=False, json_serialize=False):
    """
    Converts a suds object to a dict.
    :param json_serialize: If set, changes date and time types to iso string.
    :param key_to_lower: If set, changes index key name to lower case.
    :param obj: suds object
    :return: dict object
    """
    import datetime

    if not hasattr(obj, '__keylist__'):
        if json_serialize and isinstance(obj, (datetime.datetime, datetime.time, datetime.date)):
            return obj.isoformat()
        else:
            return obj
    data = {}
    fields = obj.__keylist__
    for field in fields:
        val = getattr(obj, field)
        if key_to_lower:
            field = field.lower()
        if isinstance(val, list):
            data[field] = []
            for item in val:
                data[field].append(sobject_to_dict(item, json_serialize=json_serialize))
        else:
            data[field] = sobject_to_dict(val, json_serialize=json_serialize)
    return data


def sobject_to_json(obj, key_to_lower=False):
    """
    Converts a suds object to json.
    :param obj: suds object
    :param key_to_lower: If set, changes index key name to lower case.
    :return: json object
    """
    import json
    data = sobject_to_dict(obj, key_to_lower=key_to_lower, json_serialize=True)
    return json.dumps(data)

class PasswordType(MessagePlugin):
    def marshalled(self, context):
        password = context.envelope.childAtPath('Header/Security/UsernameToken/Password')
        password.set(
            'Type',
            'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText'
        )


plugin = PasswordType()
soap_endpoint = 'http://%s:%s/DaletWebService/services/' % (SOAP_SERVER, SOAP_PORT)

services = [
    # 'AccessRightsService',
    # 'AssetService',
    'CategoryService',
    'ConfigurationService',
    # 'ContactService',
    'GlossaryService',
    # 'JobService',
    # 'LocatorService',
    # 'LockingService',
    # 'MediaService',
    'MetadataService',
    # 'ObjectLogService',
    # 'PlanningService',
    # 'RecordingJobService',
    # 'RundownService',
    # 'StoryContentService',
    'UserService',
    # 'WireService',
]

services_dict = {
    item: Client(soap_endpoint + item + '?wsdl', wsse=security, plugins=[plugin], faults=False) for item in services
}

objectTypeEnum = services_dict['MetadataService'].factory.create('ns2:ObjectTypeEnum')

# release_glossary_values = services_dict['GlossaryService'].service.getAllGlossaryTypes()
# print release_glossary_values
# example_release = 64941 # Cobra Juicy - Black Moth Super Rainbow (Category ID)

# release_from_category = services_dict['CategoryService'].service.getCategory(example_release)
# # print release_from_category

# category_metadata = services_dict['MetadataService'].service.getObjectMetadata(objectId=123182, objectType=objectTypeEnum.GLOSSARY_VALUE, firstIndex=0, maxResults=1000)
# # print category_metadata[1]
# # suds complex response objects are weird, so iterating through them is somewhat necessary to avoid gross junk
# for item in category_metadata[1]:
#     # print item
#     result_dict = Client.dict(item)
#     # print result_dict

# new_dict = basic_sobject_to_dict(category_metadata[1][0])

# print category_metadata

# Process for building a single 'shelves' release document from Dalet:
# one approach: iterate through metadata for every track asset 
# helper func to reformat the gross responses we get from suds
# to something more closely resembling normal JSON
# responses come back as a tuple of status code to a list of 'data fields' which are complex objects representing metadata fields
# for example:
#
# (200, [(StringAssetInfo){
#    dataFieldId = 1
#    dataFieldName = "Name"
#    dataFieldTagName = "TitleName"
#    value = "Flashlight EP_Bonobo_2014-12-01"
#  },
#  (StringAssetInfo){
#    dataFieldId = 2
#    dataFieldName = "Title Author"
#    dataFieldTagName = "TitleAuthor"
#    value = None
#  }])
#

# page through the release glossaries (every release in dalet)
last_label = ''
release_glossaries = []
while True:
    print('Got page with Last Label: {0}'.format(last_label.encode('utf-8')))   
    page = services_dict['GlossaryService'].service.getGlossaryRootValuesByGlossaryType(1009,
                                                                                        None,
                                                                                        last_label,
                                                                                        1000)[1]
    for item in page:
        release_glossaries.append(item)
    if len(page) == 1000:
        last_label = page[-1].labels[0]['label']
    elif len(page) < 1000:
        break
    else:
        print('WTF')

# a list of every release glossary in the media library
print(len(release_glossaries))

count = 0

# for each release
release_dicts = []
for release_glossary in release_glossaries:
    # try:
    #     print('GlossaryID: ' + str(release_glossary['id']))
    # except:
    #     print(release_glossary)
    #     raise

    # get metadata on the release
    glossary_metadata = services_dict['MetadataService'].service.getObjectMetadata(
        objectId=release_glossary['id'],
        objectType=objectTypeEnum.GLOSSARY_VALUE,
        firstIndex=0,
        maxResults=1000
    )


    # create a new dict for metadata
    glossary_metadata_dict = {}

    count += 1

    # iterate through the nasty data tags
    for data_tag in glossary_metadata[1]:
        try:
            # filter for the ones we want to save
            # extend this to extract more fields if needed
            if data_tag['dataFieldTagName'] in ['KEXPPrimaryGenre', 'KEXPMBID', 'KEXPDateReleased', 'KEXPFirstReleaseDate', 'KEXPLength', 'KEXPReleaseCatalogNumber', 'KEXPReleaseGroupMBID', 'KEXPTitle', 'KEXPUniqueTitle', 'KEXPReleaseArtistCredit', 'KEXPArtist', 'KEXPLabel', 'KEXPReleasePackaging', 'KEXPReleasePrimaryType', 'KEXPReleaseSecondaryType', 'KEXPReleaseStatus', 'KEXPArtist_KEXPAlias', 'KEXPArtist_KEXPArtistType', 'KEXPArtist_KEXPDisambiguation', 'KEXPArtist_KEXPLink', 'KEXPArtist_KEXPMBID', 'KEXPArtist_KEXPName', 'KEXPArtist_KEXPSortName', 'KEXPLabel_KEXPMBID', 'KEXPLabel_KEXPName', 'KEXPLabel_KEXPSortName', 'KEXPArea', 'KEXPAreaMBID', 'KEXPCountryCode']:
                glossary_metadata_dict[data_tag['dataFieldTagName']] = data_tag['value'].encode('utf-8')
        except AttributeError:
            pass
        except TypeError:
            print('type_error: ' + data_tag)

    # only add items with and MBID (which might be everything)
    if 'KEXPMBID' in glossary_metadata_dict:
        release_dicts.append(glossary_metadata_dict)

    # do a little checkpoint write in case the script fails
    if count % 100 == 0:
        with open('dalet_releases_{0}.json'.format(count), 'w') as f:
            json.dump(release_dicts, f)


print('Recovered {0} releases'.format(len(release_dicts)))

# # if we finish, write the full thing it to a file
with open('dalet_releases_full.json', 'w') as f:
    json.dump(release_dicts, f)