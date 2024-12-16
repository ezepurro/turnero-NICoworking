import { addDays, addHours } from "date-fns"

// Events for testing

export const events = [{
  title: 'Martina M',
  notes: 'Peluqueria',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    name: 'Martina_m',
    _id: '001'
  }
},
{
  title: 'Justina P',
  notes: 'Peluqueria',
  start: addDays(new Date(), 1),
  end: addDays(new Date(), 1),
  bgColor: '#fafafa',
  user: {
    name: 'Martina_m',
    _id: '001'
  }
}]