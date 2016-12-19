#HMIS Dictionary
(28/11/2016)

Web application for DHIS2 (open source, medical information system developped by Oslo University - https://www.dhis2.org/) made to simplify user access the terminology associated with information collected by MSF OCBA. 
NB: HMIS refers to Health Information Management System

##Panels

- **Dossiers**: complies names, descriptions, etc. of data elements and indicators by service as medical reference for MSF OCBA HMIS users
- **Search**: a search tool to access directly any piece of medical reference within MSF OCBA HMIS
- **Graph**: graphical visualiser of MSF OCBA HMIS data model, in development...
- **Admin**: administration of HMIS Dictionary App, in development...

##Configuration

The configuration relies on:
- an *organisationUnitGroupSet* that gather all the elements of the typology of services,
- the typology of services itself, each one is an *organisationUnitGroup* with a unique code: "OUG_HSV_#CODE#", their description are stored in tranlsations (description is only in translation as of dhis v2.25),
- then *dataSets* and *indicatorGroups* have one attribute, repectively "DS_#CODE1#_#CODE2#..." and "ING_#CODE2#" that permits the direct association with the typology of services (association with multiple services is allowed),
- finally the *dataElements* are associated via the *sections* to the dataSets and the *indicators* are associated directly to the indicatorGroups (*dataElements* outside of *sections* would not appear).
- in *indicators* the descriptions of numerators and denominators cannot be translated (as of dhis v2.25) so the key words "NUM:" and "DENOM:" (both compulsory) are used in *indicators* descriptions (which have a translation).

Some elements are hardcoded while the **Admin** panel is not ready:
- The uid of the *organisationUnitGroupSet*: [app/app.controllers.js#L14](https://github.com/msf-ocba/HMIS_Dictionary/blob/master/app/app.controllers.js#L14)
- The name of the group of user with editing right in the **Dossier** panel (potentially the **Admin** panel too): [app/app.controllers.js#L15](https://github.com/msf-ocba/HMIS_Dictionary/blob/master/app/app.controllers.js#L15)
- The search panel will not show *dataElements* or *indicators* that are not associated to a *dataSet* or an *indicatorGroup* plus *dataSets* and *indicatorGroups* can be blacklisted: [app/search/search.controllers.js#L40](https://github.com/msf-ocba/HMIS_Dictionary/blob/master/app/search/search.controllers.js#L40) and [app/search/search.controllers.js#L47](https://github.com/msf-ocba/HMIS_Dictionary/blob/master/app/search/search.controllers.js#L47)
- Only *dataElements* in the aggregated domain are currently taken into account: [app/search/search.services.js#L7](https://github.com/msf-ocba/HMIS_Dictionary/blob/master/app/search/search.services.js#L7), [app/search/search.services.js#L11](https://github.com/msf-ocba/HMIS_Dictionary/blob/master/app/search/search.services.js#L11) and [app/search/search.services.js#L14](https://github.com/msf-ocba/HMIS_Dictionary/blob/master/app/search/search.services.js#L14)
- The app is currently translated in English, French and Spanish (Portuguese traduction is pending: [languages/pt.json](https://github.com/msf-ocba/HMIS_Dictionary/blob/master/languages/pt.json)) and uses the content of DHIS2 in these 4 languages (as available per MSF OCBA configuration): [app/app.config.js#L60](https://github.com/msf-ocba/HMIS_Dictionary/blob/master/app/app.config.js#L60), [app/dossiersEditor/dossiersEditor.controllers.js#L44](https://github.com/msf-ocba/HMIS_Dictionary/blob/master/app/dossiersEditor/dossiersEditor.controllers.js#L44) and [languages/](https://github.com/msf-ocba/HMIS_Dictionary/tree/master/languages).
  
##Feedback

hmis@barcelona.msf.org
