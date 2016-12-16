#HMIS Dictionary
(28/11/2016)

Web application for DHIS2 (open source, medical information system developped by Oslo University - https://www.dhis2.org/) made to simplify user access the terminology associated with information collected by MSF OCBA. 
NB: HMIS refers to Health Information Management System

##Sections

- **Dossiers**: complies names, descriptions, etc. of data elements and indicators by service as medical reference for MSF OCBA HMIS users
- **Search**: a search tool to access directly any piece of medical reference within MSF OCBA HMIS
- **Graph**: graphical visualiser of MSF OCBA HMIS data model, in development...

##Configuration

The configuration relies on:
- an *organisationUnitGroupSet* that gather all the elements of the typology of services,
- the typology of services itself, each one is an *organisationUnitGroup* with a unique code: "OUG_HSV_#CODE#", their description are stored in tranlsations (the descriptions cannot be accessed directly at the moment),
- then *dataSets* and *indicatorGroups* have an attribute, repectively "DS_#CODE1#_#CODE2#..." and "ING_#CODE2#" that permits the direct association with the typology of services (association with multiple services is allowed),
- finally the *dataElements* are associated via the *sections* to the dataSets and the *indicators* are associated directly to the indicatorGroups.

The app is currently translated in English, French and Spanish (Portuguese will come soon) and uses the content of DHIS2 in these 4 languages (as available per MSF OCBA configuration).
  
##Feedback

hmis@barcelona.msf.org
