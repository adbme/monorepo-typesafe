import { createFileRoute } from "@tanstack/react-router";
import heroBanner from "../../hero-banner.png";
import line from "../../line.svg";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  fadeInUp,
  headerVariants,
  containerVariants,
  cardVariants,
} from "@/components/recal/animation";

export const Route = createFileRoute("/_layout/doc")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="">
      <section className="max-h-[200px] rounded-3xl flex items-center justify-center relative w-full text-white overflow-hidden">
        <motion.img
          src={heroBanner}
          className="w-full h-full object-cover"
          alt="Hero Banner"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        <div className="absolute inset-0 bg-black/20 z-0" />
      </section>
      <div className="container mx-auto px-4 max-w-4xl mt-12 mb-20">
         <div className="mb-10">
          <motion.h1
            className="text-5xl font-semibold leading-tight"
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeInUp}
          >
            Documentation
            <span className="text-primary text-6xl font-handwriting relative font-normal ml-3 inline-block">
              Recal
              <motion.img
                src={line}
                className="w-full absolute left-0 -bottom-2"
                alt=""
                initial={{ pathLength: 0, opacity: 0, scale: 0.8 }}
                animate={{ pathLength: 1, opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
              />
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 text-gray-200/80"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeInUp}
          >
            Understand the concepts behind effective memorization
          </motion.p>
        </div>


        <motion.div
          className="space-y-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  🧠 La Répétition Espacée (Spaced Repetition)
                </CardTitle>
                <CardDescription>
                  Le principe fondamental de la mémorisation à long terme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    La répétition espacée est une technique d'apprentissage
                    basée sur le principe que notre cerveau retient mieux
                    l'information lorsqu'elle est révisée à des intervalles
                    croissants dans le temps.
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">
                      Courbe de l'oubli d'Ebbinghaus
                    </h4>
                    <p className="text-sm">
                      Hermann Ebbinghaus a démontré qu'on oublie rapidement ce
                      qu'on vient d'apprendre. Sans révision, on perd environ
                      50% de l'information après une journée. La répétition
                      espacée contrecarre ce phénomène en révisant juste avant
                      l'oubli.
                    </p>
                  </div>
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>Révision juste avant l'oubli probable</li>
                    <li>
                      Intervalles de plus en plus longs entre les révisions
                    </li>
                    <li>
                      Optimise le temps d'étude en se concentrant sur ce qui est
                      difficile
                    </li>
                    <li>Améliore la rétention à long terme de 200-300%</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  📦 Les Boîtes de Leitner
                </CardTitle>
                <CardDescription>
                  Un système simple et efficace de révision par flashcards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    Inventé par le journaliste scientifique allemand Sebastian
                    Leitner dans les années 1970, ce système organise les cartes
                    mémoire (flashcards) dans plusieurs boîtes selon le niveau
                    de maîtrise.
                  </p>
                  <div className="bg-muted p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">Comment ça fonctionne ?</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="font-mono font-semibold min-w-[80px]">
                          Boîte 1 :
                        </span>
                        <span>
                          Cartes nouvelles ou difficiles → révision quotidienne
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-mono font-semibold min-w-[80px]">
                          Boîte 2 :
                        </span>
                        <span>
                          Cartes moyennement connues → révision tous les 3 jours
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-mono font-semibold min-w-[80px]">
                          Boîte 3 :
                        </span>
                        <span>Cartes bien connues → révision hebdomadaire</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-mono font-semibold min-w-[80px]">
                          Boîte 4 :
                        </span>
                        <span>Cartes maîtrisées → révision mensuelle</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <p className="text-sm">
                      <span className="font-semibold">Règle clé :</span> Réponse
                      correcte → la carte monte d'une boîte. Réponse incorrecte
                      → retour à la boîte 1.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">⚙️ L'Algorithme SM-2</CardTitle>
                <CardDescription>
                  Le calcul intelligent derrière Anki et les SRS modernes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    SuperMemo 2 (SM-2) est un algorithme développé par Piotr
                    Wozniak en 1987. C'est la base de la plupart des systèmes de
                    répétition espacée modernes comme Anki.
                  </p>

                  <div className="bg-muted p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">Principes de base</h4>
                    <ul className="list-disc list-inside space-y-2 text-sm ml-2">
                      <li>
                        Chaque carte a un facteur de facilité (EF) qui évolue
                        selon vos performances
                      </li>
                      <li>
                        L'intervalle entre révisions augmente en fonction de
                        l'EF
                      </li>
                      <li>
                        Plus vous répondez facilement, plus l'intervalle
                        augmente rapidement
                      </li>
                      <li>
                        Les erreurs réduisent l'EF et raccourcissent les
                        intervalles
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Les notes de qualité</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div className="bg-destructive/10 p-3 rounded">
                        <span className="font-semibold">0-1 :</span> Échec
                        complet → révision immédiate
                      </div>
                      <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded">
                        <span className="font-semibold">2 :</span> Difficile →
                        intervalle réduit
                      </div>
                      <div className="bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded">
                        <span className="font-semibold">3 :</span> Correct avec
                        effort → intervalle normal
                      </div>
                      <div className="bg-primary/20 p-3 rounded">
                        <span className="font-semibold">4-5 :</span> Facile →
                        intervalle augmenté
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-primary pl-4 py-2">
                    <p className="text-sm">
                      <span className="font-semibold">Pourquoi SM-2 ?</span> Il
                      adapte automatiquement la fréquence de révision à votre
                      niveau de maîtrise personnel, optimisant votre temps
                      d'étude sans effort conscient.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="text-2xl">
                  🚀 Comment Recal utilise ces concepts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    Recal combine ces trois approches pour créer une expérience
                    d'apprentissage optimale :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>
                      <span className="font-semibold">Répétition espacée</span>{" "}
                      comme principe fondamental pour planifier vos révisions
                    </li>
                    <li>
                      <span className="font-semibold">Système de boîtes</span>{" "}
                      pour visualiser votre progression de manière intuitive
                    </li>
                    <li>
                      <span className="font-semibold">SM-2 adapté</span> pour
                      calculer automatiquement les intervalles optimaux de
                      révision
                    </li>
                  </ul>
                  <div className="bg-primary/10 p-4 rounded-lg mt-4">
                    <p className="text-sm font-semibold">
                      💡 Résultat : Vous apprenez plus efficacement, en moins de
                      temps, et retenez l'information sur le long terme.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
