function validateForm () {
  const validatie = document.forms.eventToevoegen['naam', 'datum', 'locatie', 'tijden', 'grootte', 'reistijd', 'soort', 'uploaded'].value
  if (validatie === '') {
    alert('Niet alle velden zijn ingevuld! controleer het formulier.')
    return false
  }
}
