function showDeleteModal(e) {
  const id = e.target.dataset.id
  const deleteButton = document.querySelector('#modal-delete-button')
  deleteButton.action = `./records/${id}?_method=DELETE`
  console.log('done!')
}

const recordPanel = document.querySelector('.record-section')
recordPanel.addEventListener('click', (e) => {
  if (e.target.matches('#modal-button')) {
    showDeleteModal(e)
  }
})