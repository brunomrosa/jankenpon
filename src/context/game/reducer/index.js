import {toast} from 'react-toastify'

export default function gameReducer(state, action) {
  switch (action.type) {
    case 'rock': {
      switch (state.cpu) {
        case 'scissor': {
          toast.success('wow, you rock!')
          return {
            cpu: state.cpu,
            wins: state.wins + 1,
            losses: state.losses,
          }
        }
        case 'paper': {
          toast.error('cpu rocked you!')
          return {
            cpu: state.cpu,
            wins: state.wins,
            losses: state.losses + 1,
          }
        }
        default: {
          toast.info('Fair match...')
          return {
            cpu: state.cpu,
            wins: state.wins,
            losses: state.losses,
          }
        }
      }
    }
    case 'scissor': {
      switch (state.cpu) {
        case 'paper': {
          toast.success('wow, you rock!')
          return {
            cpu: state.cpu,
            wins: state.wins + 1,
            losses: state.losses,
          }
        }
        case 'rock': {
          toast.error('cpu rocked you!')
          return {
            cpu: state.cpu,
            wins: state.wins,
            losses: state.losses + 1,
          }
        }
        default: {
          toast.info('Fair match...')
          return {
            cpu: state.cpu,
            wins: state.wins,
            losses: state.losses,
          }
        }
      }
    }
    case 'paper': {
      switch (state.cpu) {
        case 'rock': {
          toast.success('wow, you rock!')
          return {
            cpu: state.cpu,
            wins: state.wins + 1,
            losses: state.losses,
          }
        }
        case 'scissor': {
          toast.error('cpu rocked you!')
          return {
            cpu: state.cpu,
            wins: state.wins,
            losses: state.losses + 1,
          }
        }
        default: {
          toast.info('Fair match...')
          return {
            cpu: state.cpu,
            wins: state.wins,
            losses: state.losses,
          }
        }
      }
    }
    case 'initialize': {
      const options = ['rock', 'scissor', 'paper']
      const selected = Math.floor(Math.random() * options.length)
      return {cpu: options[selected], wins: 0, losses: 0}
    }
    case 'newMatch': {
      const options = ['rock', 'scissor', 'paper']
      const selected = Math.floor(Math.random() * options.length)
      return {cpu: options[selected], wins: state.wins, losses: state.losses}
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}
