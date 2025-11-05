import Airtable from 'airtable';

// Initialize Airtable
const initAirtable = () => {
  const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
  const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;

  if (!apiKey || !baseId) {
    console.warn('Airtable credentials not configured');
    return null;
  }

  const base = new Airtable({ apiKey }).base(baseId);
  return base;
};

// Submit a new resource to Airtable
export const submitResourceToAirtable = async (resourceData) => {
  const base = initAirtable();
  if (!base) {
    throw new Error('Airtable not configured');
  }

  const tableName = import.meta.env.VITE_AIRTABLE_TABLE_NAME || 'Resources';

  try {
    const record = await base(tableName).create([
      {
        fields: {
          Title: resourceData.title,
          Description: resourceData.description,
          URL: resourceData.url,
          Type: resourceData.type,
          Category: resourceData.category,
          Tags: resourceData.tags.join(', '),
          'Image URL': resourceData.imageUrl || '',
          'Local Relevance': resourceData.localRelevance || '',
          'Submitted By': resourceData.submittedByName,
          'Submitted Email': resourceData.submittedBy,
          'Submitted Date': resourceData.submittedDate,
          Status: 'Pending Review',
        },
      },
    ]);

    return record[0];
  } catch (error) {
    console.error('Error submitting to Airtable:', error);
    throw error;
  }
};

// Fetch resources from Airtable (optional - for syncing)
export const fetchResourcesFromAirtable = async () => {
  const base = initAirtable();
  if (!base) {
    return [];
  }

  const tableName = import.meta.env.VITE_AIRTABLE_TABLE_NAME || 'Resources';

  try {
    const records = await base(tableName)
      .select({
        filterByFormula: '{Status} = "Approved"',
        sort: [{ field: 'Submitted Date', direction: 'desc' }],
      })
      .all();

    return records.map((record) => ({
      id: record.id,
      title: record.fields.Title,
      description: record.fields.Description,
      url: record.fields.URL,
      type: record.fields.Type,
      category: record.fields.Category,
      tags: record.fields.Tags ? record.fields.Tags.split(', ') : [],
      imageUrl: record.fields['Image URL'] || null,
      localRelevance: record.fields['Local Relevance'] || null,
      submittedDate: record.fields['Submitted Date'],
      featured: record.fields.Featured || false,
    }));
  } catch (error) {
    console.error('Error fetching from Airtable:', error);
    return [];
  }
};
