const axios = require('axios');

const { datahub } = require('../config');

axios.defaults.withCredentials = true;

const getPlaySession = () => {
  return new Promise(async resolve => {
    let loginRes = await axios.post(
      'http://datahub.yc.pbd.ai:9002/logIn',
      {
        username: datahub.username,
        password: datahub.password
      }
    )
    resolve(loginRes)
  })
}

const getDataSets = (path, Cookie, dataSets = [], dataCatalog = []) => {
  return new Promise(async resolve => {

    let dataSetsRootRes = await axios.post('http://datahub.yc.pbd.ai:9002/api/graphql',
      {
        "variables": {
          "input": {
            "type": "DATASET",
            "path": path,
            "start": 0,
            "count": 10,
            "filters": null
          }
        },
        "query": "query getBrowseResults($input: BrowseInput!) {\n  browse(input: $input) {\nentities {\nurn\ntype\n... on Dataset{\nname\norigin\ndescription\n}\n}\ngroups {\nname\n}\nstart\ncount\ntotal\n}}"
      }, {
      headers: {
        Cookie: Cookie
      }
    })

    for (let i = 0; i < dataSetsRootRes.data.data.browse.entities.length; i++)
      dataSets.push(await getDataSetInfo(dataSetsRootRes.data.data.browse.entities[i].urn, Cookie, path))

    for (let i = 0; i < dataSetsRootRes.data.data.browse.groups.length; i++) {
      dataCatalog.push([...path, dataSetsRootRes.data.data.browse.groups[i].name].join('/'))
      [dataSets, dataCatalog] = await getDataSets([...path, dataSetsRootRes.data.data.browse.groups[i].name], Cookie, dataSets, dataCatalog)
    }

    resolve([dataSets, dataCatalog])

  })
}

const getRootDataSets = (path, Cookie, dataSets = [], dataCatalog = []) => {
  return new Promise(async resolve => {

    let dataSetsRootRes = await axios.post('http://datahub.yc.pbd.ai:9002/api/graphql',
      {
        "variables": {
          "input": {
            "type": "DATASET",
            "path": path,
            "start": 0,
            "count": 10,
            "filters": null
          }
        },
        "query": "query getBrowseResults($input: BrowseInput!) {\n  browse(input: $input) {\nentities {\nurn\ntype\n... on Dataset{\nname\norigin\ndescription\n}\n}\ngroups {\nname\n}\nstart\ncount\ntotal\n}}"
      }, {
      headers: {
        Cookie: Cookie
      }
    })

    for (let i = 0; i < dataSetsRootRes.data.data.browse.entities.length; i++)
      dataSets.push(await getDataSetInfo(dataSetsRootRes.data.data.browse.entities[i].urn, Cookie, path))

    for (let i = 0; i < dataSetsRootRes.data.data.browse.groups.length; i++) {
      dataCatalog.push([...path, dataSetsRootRes.data.data.browse.groups[i].name].join('/'))
      [dataSets, dataCatalog] = await getDataSets([...path, dataSetsRootRes.data.data.browse.groups[i].name], Cookie, dataSets, dataCatalog)
    }

    let dataCatalogTree = [];
    let level = { dataCatalogTree };

    dataCatalog.forEach(path => {
      path.split('/').reduce((r, name, i, a) => {
        if (!r[name]) {
          r[name] = { dataCatalogTree: [] };
          r.dataCatalogTree.push({ name, children: r[name].dataCatalogTree })
        }

        return r[name];
      }, level)
    })

    resolve([dataSets, dataCatalogTree])

  })
}

const getDataSetInfo = (urn, Cookie, path) => {
  return new Promise(async resolve => {

    let DataSetInfoRes = await axios.post('http://datahub.yc.pbd.ai:9002/api/graphql',
      {
        "variables": {
          "urn": urn
        },
        "query": "query getDataset($urn: String!) {\n  dataset(urn: $urn) {\n ...nonRecursiveDatasetFields\n schemaMetadata(version: 0) {\n ...schemaMetadataFields\n __typename\n }\n editableSchemaMetadata {\n editableSchemaFieldInfo {\n fieldPath\n description\n __typename\n }\n __typename\n }\n __typename\n }\n }\n \n fragment nonRecursiveDatasetFields on Dataset {\n urn\n name\n type\n origin\n description\n uri\n platform {\n name\n info {\n displayName\n logoUrl\n __typename\n }\n __typename\n }\n platformNativeType\n properties {\n customProperties {\n key\n value\n __typename\n }\n __typename\n }\n editableProperties {\n description\n __typename\n }\n ownership {\n ...ownershipFields\n }\n institutionalMemory {\n elements {\n url\n author {\n urn\n username\n __typename\n }\n description\n created {\n actor\n time\n __typename\n }\n __typename\n }\n __typename\n }\n schemaMetadata(version: 0) {\n ...schemaMetadataFields\n __typename\n }\n previousSchemaMetadata: schemaMetadata(version: -1) {\n ...schemaMetadataFields\n __typename\n }\n editableSchemaMetadata {\n editableSchemaFieldInfo {\n fieldPath\n description\n globalTags {\n ...globalTagsFields\n __typename\n }\n __typename\n }\n __typename\n }\n deprecation {\n actor\n deprecated\n note\n decommissionTime\n __typename\n }\n globalTags {\n ...globalTagsFields\n __typename\n }\n glossaryTerms {\n ...glossaryTerms\n __typename\n }\n __typename\n }\n \n fragment ownershipFields on Ownership {\n owners {\n owner {\n ... on CorpUser {\n urn\n type\n username\n info {\n active\n displayName\n title\n email\n firstName\n lastName\n fullName\n }\n }\n ... on CorpGroup {\n urn\n type\n name\n info {\n email\n admins {\n urn\n username\n info {\n active\n displayName\n title\n email\n firstName\n lastName\n fullName\n }\n }\n members {\n urn\n username\n info {\n active\n displayName\n title\n email\n firstName\n lastName\n fullName\n }\n }\n }\n }\n }\n type\n }\n }\n \n fragment schemaMetadataFields on SchemaMetadata {\n datasetUrn\n name\n platformUrn\n version\n fields {\n fieldPath\n jsonPath\n nullable\n description\n type\n nativeDataType\n recursive\n }\n primaryKeys\n foreignKeys {\n name\n sourceFields {\n fieldPath\n }\n foreignFields {\n fieldPath\n }\n foreignDataset {\n urn\n name\n type\n origin\n description\n uri\n platform {\n name\n info {\n displayName\n logoUrl\n }\n }\n platformNativeType\n ownership {\n ...ownershipFields\n }\n globalTags {\n ...globalTagsFields\n }\n glossaryTerms {\n ...glossaryTerms\n }\n }\n }\n }\n \n fragment globalTagsFields on GlobalTags {\n tags {\n tag {\n urn\n name\n description\n __typename\n }\n __typename\n }\n __typename\n }\n \n fragment glossaryTerms on GlossaryTerms {\n terms {\n term {\n urn\n name\n __typename\n }\n __typename\n }\n __typename\n }"
      }, {
      headers: {
        Cookie: Cookie
      }
    })

    resolve({
      urn: DataSetInfoRes.data.data.dataset.urn,
      folder: path.join('/'),
      name: DataSetInfoRes.data.data.dataset.name,
      fields: DataSetInfoRes.data.data.dataset.schemaMetadata.fields,
    })

  })
}

module.exports = () => {
  return new Promise(resolve => {
    getPlaySession().then(d => {
      getRootDataSets([], d.headers['set-cookie'].map(v => v.split(';')[0]).join('; ') + ';').then(v => {
        resolve(v);
      })
    })
  })
}