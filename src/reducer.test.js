import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING',
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD',
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK',
    }

    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)

    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD',
    }

    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)

    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    })
  })

  test('action type ZERO resets all values', () => {
    const actionGood = {
      type: 'GOOD',
    }
    const actionOk = {
      type: 'OK',
    }
    const actionBad = {
      type: 'BAD',
    }
    // Make 3x reducer calls with good, ok and bad
    let newState = counterReducer(initialState, actionGood)
    newState = counterReducer(newState, actionOk)
    newState = counterReducer(newState, actionBad)

    expect(newState).toEqual({
      good: 1,
      ok: 1,
      bad: 1,
    })

    const actionZero = {
      type: 'ZERO',
    }

    // Freeze the most updated version of newState since we wanna check if the actionZero will cause a mutation or not
    deepFreeze(newState)
    const zeroState = counterReducer(newState, actionZero)
    expect(zeroState).toEqual({
      good: 0,
      ok: 0,
      bad: 0,
    })
  })
})
