import { createPinia } from 'pinia'
import { useAssessmentStore } from '@/stores/AssessmentStore'
import StartingPoint from '../StartingPoint.vue'

function mountStartingPoint(extraOptions: Record<string, unknown> = {}) {
  const pinia = createPinia()
  cy.mount(StartingPoint, {
    global: { plugins: [pinia] },
    ...extraOptions
  })
  return pinia
}

describe('StartingPoint.vue - HSH assessment', () => {
  it('switches to the HSH panel when the "HSH assessment" button is clicked', () => {
    mountStartingPoint()
    cy.contains('button', 'HSH assessment').click()
    cy.contains('How do you want to assess this HSH resource?').should('be.visible')
  })

  it('defaults to automated mode, showing the file input and a disabled Start button', () => {
    mountStartingPoint()
    cy.contains('button', 'HSH assessment').click()
    cy.get('#hsh-mode-radio-1').should('be.checked')
    cy.get('input[type="file"]').should('be.visible')
    cy.contains('button', 'Start').should('be.disabled')
  })

  it('switching to manual mode hides the file input and enables Start immediately', () => {
    mountStartingPoint()
    cy.contains('button', 'HSH assessment').click()
    cy.get('#hsh-mode-radio-2').check({ force: true })
    cy.get('input[type="file"]').should('not.exist')
    cy.contains('button', 'Start').should('not.be.disabled')
  })

  it('enables Start once a metadata JSON file is selected in automated mode', () => {
    mountStartingPoint()
    cy.contains('button', 'HSH assessment').click()
    cy.contains('button', 'Start').should('be.disabled')

    cy.get('input[type="file"]').selectFile(
      {
        contents: Cypress.Buffer.from(JSON.stringify({ resource: { identifier: 'test' } })),
        fileName: 'metadata.json',
        mimeType: 'application/json'
      },
      { force: true }
    )

    cy.contains('button', 'Start').should('not.be.disabled')
  })

  it('stores the raw (unparsed) file text as metadata, not a parsed object', () => {
    const pinia = mountStartingPoint()
    const rawJson = JSON.stringify({ resource: { identifier: 'test' } })

    cy.contains('button', 'HSH assessment').click()
    cy.get('input[type="file"]').selectFile(
      { contents: Cypress.Buffer.from(rawJson), fileName: 'metadata.json', mimeType: 'application/json' },
      { force: true }
    )
    // FileReader.readAsText is async - wait for its effect (Start becoming
    // enabled) before asserting on the store, since cy.then() doesn't retry.
    cy.contains('button', 'Start').should('not.be.disabled')

    cy.then(() => {
      const store = useAssessmentStore(pinia)
      expect(store.sessionInput.metadata).to.eq(rawJson)
      expect(typeof store.sessionInput.metadata).to.eq('string')
    })
  })

  it('emits newSession with subject_type=hsh and is_manual=true for a manual assessment', () => {
    const onNewSession = cy.stub().as('newSession')
    const pinia = mountStartingPoint({ props: { onNewSession } })

    cy.contains('button', 'HSH assessment').click()
    cy.get('#hsh-mode-radio-2').check({ force: true })
    cy.contains('button', 'Start').click()

    cy.get('@newSession').should('have.been.calledOnce')
    cy.then(() => {
      const store = useAssessmentStore(pinia)
      expect(store.sessionInput.subject_type).to.eq('hsh')
      expect(store.sessionInput.is_manual).to.eq(true)
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions -- chai BDD getter assertion, not an unused expression
      expect(store.sessionInput.metadata).to.be.null
    })
  })

  it('emits newSession with subject_type=hsh, is_manual=false and the raw metadata for an automated assessment', () => {
    const onNewSession = cy.stub().as('newSession')
    const pinia = mountStartingPoint({ props: { onNewSession } })
    const rawJson = JSON.stringify({ resource: { identifier: 'test' } })

    cy.contains('button', 'HSH assessment').click()
    cy.get('input[type="file"]').selectFile(
      { contents: Cypress.Buffer.from(rawJson), fileName: 'metadata.json', mimeType: 'application/json' },
      { force: true }
    )
    cy.contains('button', 'Start').click()

    cy.get('@newSession').should('have.been.calledOnce')
    cy.then(() => {
      const store = useAssessmentStore(pinia)
      expect(store.sessionInput.subject_type).to.eq('hsh')
      expect(store.sessionInput.is_manual).to.eq(false)
      expect(store.sessionInput.metadata).to.eq(rawJson)
    })
  })
})
