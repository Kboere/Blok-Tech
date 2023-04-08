const formulier = document.querySelector('form.survey-add')

if (formulier) {
  const validateForm = () => {
    const fields = ['naam', 'datum', 'locatie', 'tijden', 'grootte', 'reistijd', 'soort', 'uploaded']
    const values = fields.map(field => document.forms.eventToevoegen[field].value)
    const validation = values.join('')

    if (validation === '') {
      alert('Niet alle velden zijn ingevuld! controleer het formulier.')
      return false
    }
  }

  formulier.addEventListener('submit', validateForm)
}