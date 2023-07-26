import axios from 'axios';

export const updateProfile = async (first_name, last_name, is_verified, email, description, image_url, editId) => {
    const api_url = 'https://api.poc.graphql.dev.vnplatform.com/graphql';
    const authorization_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYW5kaWRhdGVfbmFtZSI6InNhZGFmLmtoYW5AYWlkZXRpYy5pbiIsImlzX2NhbmRpZGF0ZSI6dHJ1ZSwiaWF0IjoxNjkwMTkwODE3LCJleHAiOjE2OTA3MDkyMTd9.svY06nK9bATWCoTbJnXFGYSYu05R6x-b3wk9wiM9X9Q'; // Replace with your actual token

    const headers = {
      Authorization: authorization_token,
      'Content-Type': 'application/json',
    };

    console.log({first_name, last_name, is_verified, email, description, image_url, editId})
    const query = `
      query GetAllProfiles($orderBy: globalOrderBy, $searchString: String, $rows: Int, $page: Int) {
        getAllProfiles(orderBy: $orderBy, searchString: $searchString, rows: $rows, page: $page) {
          size
          profiles {
            id
            first_name
            last_name
            email
            is_verified
            image_url
            description
          }
        }
      }
    `;

    const mutation = `
      mutation UpdateProfile($updateProfileId: String!, $firstName: String!, $lastName: String!, $email: String!, $isVerified: Boolean!, $imageUrl: String!, $description: String!) {
        updateProfile(id: $updateProfileId, first_name: $firstName, last_name: $lastName, email: $email, is_verified: $isVerified, image_url: $imageUrl, description: $description) {
          id
          first_name
          last_name
          email
          is_verified
          image_url
          description
        }
      }
    `;

    const variables = {
      updateProfileId: editId,
      firstName: first_name,
      lastName: last_name,
      email,
      isVerified: is_verified,
      imageUrl: image_url,
      description,
    };


    try {
       await axios.post(api_url, { query: mutation, variables }, { headers });
      const queryResponse = await axios.post(api_url, { query: query, variables: { orderBy: { key: "is_verified", sort: "desc" }, rows: 10, page: 0, searchString: "" } }, { headers });
      const allProfiles = queryResponse.data.data.getAllProfiles.profiles;
      return allProfiles;
    } catch (error) {
      console.error('Error creating profile:');
    }
  };