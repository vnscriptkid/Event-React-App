# SCHEMA

# Schema

```js
/events

[
    event-1 {
        title: "event 1",
        category: "travel",
        date: firestoreTimestamp (date + time),
        description: "lorem",
        city: map {
            address: "hanoi",
            latLnt: {
                lat: 10,
                lng: 20
            }
        }
        venue: map {
            address: "opera",
            latLng: {
                lat: 10,
                lng: 20
            }
        },
        hostedBy: "thanh",
        hostPhotoURL: "http://...",
        attendees: [
            {
                id: "user-1",
                displayName: "Someone",
                photoURL: "http://..."
            },
            {
                id: "user-2",
                displayName: "Someone else",
                photoURL: "http://..."
            }
        ]
    }
]
```
