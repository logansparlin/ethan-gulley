// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Documents
import homePage from './documents/homePage';
import informationPage from './documents/informationPage';
import project from './documents/project';
import headerSettings from './documents/settings/headerSettings';

// Objects
import blockContent from './objects/blockContent';
import imgWithAlt from './objects/imgWithAlt';
import pageLink from './objects/pageLink';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // Documents
    homePage,
    project,
    headerSettings,
    informationPage,

    // Objects
    blockContent,
    imgWithAlt,
    pageLink,
  ])
});
