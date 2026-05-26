console.log("%c HI", "color: firebrick")
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = "https://dog.ceo/api/breeds/list/all"

document.addEventListener("DOMContentLoaded", () => {
  const alphaStr = "abcdefghijklmnopqrstuvwxyz"
  const breedList = document.getElementById("dog-breeds")
  addImages(document.getElementById("dog-image-container"))
  listBreeds(breedList)
  const breedDropdown = document.getElementById("breed-dropdown")
  
  for(const letter of alphaStr) {
    const breedOpt = document.createElement('option')
    breedOpt.textContent = letter
    breedOpt.value = letter
    breedDropdown.appendChild(breedOpt)
  }
  breedDropdown.addEventListener("change", (e) => {
    filterDogBreeds(breedList, e.target.value)
  })
})

function addImages(parentDiv) {
  fetch(imgUrl)
    .then((res) => res.json())
    .then((images) => {
      for (image of images.message) {
        const imgEle = document.createElement("img")
        imgEle.setAttribute("src", image)

        parentDiv.append(imgEle)
      }
    })
}

function listBreeds(parentDiv) {
  fetch(breedUrl)
    .then((res) => res.json())
    .then((breeds) => {
      const liArr = []
      for (breed in breeds.message) {
        const breedLi = document.createElement("li")
        breedLi.textContent = breed
        breedLi.setAttribute("data-clicked", "false")
        breedLi.addEventListener("click", (e) => {
          if (e.target.getAttribute("data-clicked") == "false") {
            e.target.style.color = "#b104c4"
            e.target.setAttribute("data-clicked", "true")
          } else {
            e.target.style.color = "black"
            e.target.setAttribute("data-clicked", "false")
          }
        })

        liArr.push(breedLi)
      }

      parentDiv.replaceChildren(...liArr)
    })
}

function filterDogBreeds(parentDiv, selection) {
  if (selection == "none") {
    listBreeds(parentDiv)
  } else {
    fetch(breedUrl)
      .then((res) => res.json())
      .then((breeds) => {
        const liArr = []
        for (breed in breeds.message) {
          if (breed[0] === selection) {
            const breedLi = document.createElement("li")
            breedLi.textContent = breed
            breedLi.setAttribute("data-clicked", "false")
            breedLi.addEventListener("click", (e) => {
              if (e.target.getAttribute("data-clicked") == "false") {
                e.target.style.color = "#b104c4"
                e.target.setAttribute("data-clicked", "true")
              } else {
                e.target.style.color = "black"
                e.target.setAttribute("data-clicked", "false")
              }
            })

            liArr.push(breedLi)
          }
        }

        parentDiv.replaceChildren(...liArr)
      })
  }
}
