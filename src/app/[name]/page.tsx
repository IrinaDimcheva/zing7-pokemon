import Image from 'next/image';
import { fetchPokemon } from '@/lib/data';

export default async function Page({ params }: { params: { name: string } }) {
  const pokemon = (await fetchPokemon(params.name)) as PokemonAPI.Pokemon;

  return (
    <section className="max-w-[1140px] mx-auto p-8 py-24">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">{pokemon.name}</h1>
        <div className="w-[300px] h-[300px]">
          <Image
            src={pokemon.sprites?.front_default}
            alt={pokemon.name}
            width={300}
            height={300}
          />
        </div>
        <section>
          <h3 className="text-2xl font-bold">Abilities</h3>
          <ul className="py-8 flex flex-wrap gap-y-4 gap-x-12">
            {pokemon.abilities.map((a) => (
              <li key={a.ability.name}>{a.ability.name}</li>
            ))}
          </ul>
          <p>
            Base experience: <span>{pokemon.base_experience}</span>
          </p>
          <h3 className="text-2xl font-bold pt-12">Forms</h3>
          <ul className="py-8 flex flex-wrap gap-y-4 gap-x-12">
            {pokemon.forms.map((f) => (
              <li key={f.name}>{f.name}</li>
            ))}
          </ul>
          <h3 className="text-2xl font-bold pt-12">Moves</h3>
          <ul className="py-8 flex flex-wrap gap-y-4 gap-x-12">
            {pokemon.moves.map((m) => (
              <li key={m.move.name}>{m.move.name}</li>
            ))}
          </ul>
          <h3 className="text-2xl font-bold pt-12">Stats</h3>
          <ul className="py-8 flex flex-wrap gap-y-4 gap-x-12">
            {pokemon.stats.map((s) => (
              <li key={s.stat.name}>
                <p>name: {s.stat.name}</p>
                <p>base stat: {s.base_stat}</p>
                <p>effort: {s.effort}</p>
              </li>
            ))}
          </ul>
          <h3 className="text-2xl font-bold pt-12">Types</h3>
          <ul className="py-8 flex flex-wrap gap-y-4 gap-x-12">
            {pokemon.types.map((t) => (
              <li key={t.type.name}>
                <p>name: {t.type.name}</p>
                <p>slot: {t.slot}</p>
              </li>
            ))}
          </ul>
          <p>weight: {pokemon.weight}</p>
        </section>
      </div>
    </section>
  );
}
