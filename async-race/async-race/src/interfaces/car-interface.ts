export default interface CarInterface {
  name: string,
  color: string,
  id: number,
  carTrack: HTMLElement,
  carImage: HTMLElement,
  wins: number | undefined,
  bestTime: number | undefined
}