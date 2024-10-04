import fetch from "node-fetch";

const URL = "https://jsonplaceholder.typicode.com/";

const exercici1 = async () => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    const response = await fetch(`${URL}todos?userId=9`, options);

    const data = await response.json();
    console.log("Totes les tasques de la Glenna Reichert 1\n");
    data.forEach((task) => {
      if (task.completed) {
        console.log(`${task.title}: Completa\n`);
      } else {
        console.log(`${task.title}: No està completa\n`);
      }
    });
  } catch (err) {
    console.error("Could not fetch data: ", err);
  }
};

// exercici1();

const getUserPost = async (userId) => {
  try {
    const response = await fetch(`${URL}posts?userId=${userId}`);
    return await response.json();
  } catch (err) {
    console.error("Error:", err);
  }
};

const getComments = async (postId) => {
  try {
    const response = await fetch(`${URL}comments?postId=${postId}`);
    return response.json();
  } catch (err) {
    console.error("Error: ", err);
  }
};

const exercici2 = async () => {
  try {
    const USER_ID = 9;

    const posts = await getUserPost(USER_ID);

    for (let post of posts) {
      console.log(`Títol: ${post.title}\n`);
      const comments = await getComments(post.id);

      comments.forEach((comment) => {
        console.log(`Comentari: ${comment.body}\n`);
      });

      console.log("\n");
    }
  } catch (err) {
    console.error("Error: ", err);
  }
};

// exercici2();

const getUserByName = async (name) => {
  try {
    const response = await fetch(`${URL}users`);
    const users = await response.json();
    return users.find((user) => user.name === name);
  } catch (err) {
    console.error("Error fetching users: ", err);
  }
};

const getAlbumsByUserId = async (userId) => {
  try {
    const response = await fetch(`${URL}albums?userId=${userId}`);
    return await response.json();
  } catch (err) {
    console.error("Error fetching albums: ", err);
  }
};

const getPhotosByAlbumId = async (albumId) => {
  try {
    const response = await fetch(`${URL}photos?albumId=${albumId}`);
    return await response.json();
  } catch (err) {
    console.error("Error fetching photos: ", err);
  }
};

const exercici3 = async () => {
  try {
    const userName = "Glenna Reichert";
    const user = await getUserByName(userName);

    if (!user) {
      console.log(`No s'ha trobat a l'usuari: ${userName}`);
      return;
    }

    console.log(`Albums i fotos de${user.name}:\n`);

    const albums = await getAlbumsByUserId(user.id);

    for (let album of albums) {
      console.log(`Album: ${album.title}\n`);
      const photos = await getPhotosByAlbumId(album.id);
      photos.forEach((photo) => {
        console.log(`Titol de la foto: ${photo.title}`);
        console.log(`URL: ${photo.url}\n`);
      });
      console.log("\n");
    }
  } catch (err) {
    console.error("Error: ", err);
  }
};

// exercici3();
