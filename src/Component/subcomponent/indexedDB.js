export const PostData = async (data) => {
    const obj = {
        ...data,
        id: 'node'
    };

    var openRequest = indexedDB.open("canvas_node", 1); // Request version 4.

    openRequest.onupgradeneeded = function(event) {
        let db = event.target.result;
        if (!db.objectStoreNames.contains('node')) { // if there's no "filter_bhi" store
            var objectStore = db.createObjectStore('node', {keyPath: 'id'}); // create it
        }

        objectStore.transaction.oncomplete = function(event) {
            db.transaction("node", "readwrite").objectStore("node").add(obj);
        };
    };
    
    openRequest.onerror = function() {
        console.error("Error", openRequest.error);
    };
    
    openRequest.onsuccess = function(event) {
        let db = event.target.result;

        if (db.objectStoreNames.contains('node')) { // if there's no "books" store

            var trans = db.transaction("node", "readwrite");
            trans.objectStore("node");
        }
    // continue working with database using db object
    };
}

export const ReadData = async () => {

    var openRequest = indexedDB.open("canvas_node", 1); // Request version 4.

    return new Promise ((resolve, reject) => {
        openRequest.onsuccess = async function (event) {
            let db = event.target.result;
            var data
    
            if ( await db.objectStoreNames.contains('node')){
                var trans2 = db.transaction("node", "readonly");
                var store2 = trans2.objectStore("node");
                var request2 = new Promise ((resolve, reject) => {
                    store2.get('filter').onsuccess = (event)=> {
                        // let data = await request2.result
                        // readData(request2.result)
                        resolve(event.target.result)
                    };
                })

                data = request2.then(async res => {
                    return await res
                })

            }
        
        resolve (data)
        }

    })
}