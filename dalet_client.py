from suds.client import Client
from suds.wsse import Security, UsernameToken
from suds.plugin import MessagePlugin

SOAP_SERVER = 'dalet-mig-1.kexp.org' # does the dalet-test-2 server work for this?
SOAP_PORT = 8081

security = Security()
token = UsernameToken('', '')
security.tokens.append(token)


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

# make a test request to the CategoryService, returning the MusicLibrary 'category'
# Note: a category is a set of references to 'assets'
# response = services_dict['CategoryService'].service.getCategory(9768)

# print response

# user = services_dict['UserService'].service.getGroupsByUser(96)
# print user

example_release = 64941 # Cobra Juicy - Black Moth Super Rainbow (Category ID)

release_from_category = services_dict['CategoryService'].service.getCategory(example_release)
# print release_from_category

category_metadata = services_dict['MetadataService'].service.getObjectMetadata(objectId=123182, objectType=objectTypeEnum.GLOSSARY_VALUE, firstIndex=0, maxResults=1000)
print category_metadata
# goal: pull all metadata from Dalet for a given release

# last_label = ''
# live_performance_glossaries = []
# while True:
#     print('Got page with Last Label: {0}'.format(last_label))
#     page = services_dict['GlossaryService'].service.getGlossaryRootValuesByGlossaryType(1010,
#                                                                                         None,
#                                                                                         last_label,
#                                                                                         1000)[1]
#     for item in page:
#         live_performance_glossaries.append(item)
#     if len(page) == 1000:
#         last_label = page[-1].labels[0]['label']
#     elif len(page) < 1000:
#         break
#     else:
#         print('WTF')


# print(len(live_performance_glossaries))

# count = 0
# for live_performance_glossary in live_performance_glossaries:
#     # try:
#     #     print(live_performance_glossary['id'])
#     # except:
#     #     print(live_performance_glossary)
#     #     raise

#     glossary_metadata = services_dict['MetadataService'].service.getObjectMetadata(
#         objectId=live_performance_glossary['id'],
#         objectType=objectTypeEnum.GLOSSARY_VALUE,
#         firstIndex=0,
#         maxResults=1000
#     )

#     glossary_metadata_dict = {}

#     count += 1
#     # print(count)

#     for data_tag in glossary_metadata[1]:
#         try:
#             if data_tag['dataFieldTagName'] in ['ItemCode', 'KEXPLivePerformanceSerialID']:
#                 glossary_metadata_dict[data_tag['dataFieldTagName']] = data_tag['value']
#         except AttributeError:
#             pass
#         except TypeError:
#             print(data_tag)

#     # print(glossary_metadata_dict)
#     try:
#         live_performance_log = LivePerformanceLog.objects.get(
#             session_serial=int(glossary_metadata_dict['KEXPLivePerformanceSerialID'])
#         )
#     except KeyError:
#         print(glossary_metadata_dict)

#     live_performance_log.dalet_item_code = glossary_metadata_dict['ItemCode']
#     live_performance_log.save()
#     # print(live_performance_log.dalet_item_code)