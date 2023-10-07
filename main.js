$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id !== null) {
        console.log('The "id" query parameter is:', id);
        fetch('data.json')
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const foundObject = data.find(obj => obj.ID == id);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    } else {
        fetch('data.json')
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            for (let infoKey in data) {
                const info = data[infoKey];
                const title = info["Name"]
                const size = info["size"]
                const tags = info["Category"]
                const img_url = info["Preview"] 
                const boxDiv = $('<div>').addClass('box');
                boxDiv.append(`
                    <div class="preview">
                        <img src="${'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'}" height="100%" width="100%"/>
                    </div>
                    <div class="content">
                        <h3>${"Title Here"}</h3>
                        <h4><p class="left">Size</p><p class="right">${size}</p></h4>
                        <h4><p class="left">Tags</p><p class="right">${"#tag, #tag, #tag"/*tags.map(tag => '#' + tag).join(', ')*/}</p></h4>
                        <h4 style="margin-top: 40px;"><img src="avatar.png" height="15px" width="15px"/> Michal Finn | 06-10-2023 21:26</h4>
                        <button class="download"><a href='/?id=${info['ID']}'>Download</a></button>
                    </div>
                `);
                $('.main').append(boxDiv);
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }
});
