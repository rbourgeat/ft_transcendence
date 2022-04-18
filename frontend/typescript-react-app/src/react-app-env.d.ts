/**
 * Nécessaire pour loader et typer la vidéo sur la page de welcome - plus utilisé mais intéressant
 */
declare module '*.mp4'
{
	const src: string;
	export default src;
}
