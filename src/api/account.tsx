
export type resultdata = {
    "id_akun": number,
    "username": string,
    "email": string,
    "password": string,
    "deskripsi_profil": string,
}


export async function DataAccount(query: string) {
    if (query.trim() === "") return [];
    // /?q=${encodeURI(query)}
    
             
    const response = await fetch(
      `/api/login/`
    );
    // http://localhost:8001
    
    const results = await response.json();
    // console.log("response ", results)
    const documents = results as resultdata[];
    console.log(documents);

    return documents.slice(0, documents.length).map(({ id_akun, username, email, password, deskripsi_profil  }) => ({
        id_akun, username, email, password, deskripsi_profil
      }));
  }