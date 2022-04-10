## `events` CRUD

- listen for events list

```js
collection(`events`).onSnapshot((listSnapshot) => {
  const events = listSnapshot.docs.map((docSnapshot) => ({
    ...docSnapshot.data(),
    id: docSnapshot.id,
  }));
});
```

- listen for single event

```js
collection(`events`)
  .doc(`event-id`)
  .onSnapshot((snapshot) => {
    const event = {
      ...snapshot.data(),
      id: snapshot.id,
    };
  });
```
