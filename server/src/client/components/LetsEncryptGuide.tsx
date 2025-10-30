import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Server,
  Globe,
  CheckCircle,
  XCircle,
  Shield,
  Key,
  FileText,
  Zap,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LetsEncryptGuide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    // Slide 1: Introduction
    {
      title: "Introduction à Let's Encrypt",
      icon: <Shield className="w-16 h-16 text-blue-500 mb-4" />,
      content: (
        <div className="space-y-6">
          <p className="text-xl text-gray-700 leading-relaxed">
            Let's Encrypt est une autorité de certification gratuite, automatisée et ouverte qui fournit des certificats SSL/TLS pour sécuriser les sites web.
          </p>
          <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <Key className="w-5 h-5" />
              Pourquoi utiliser Let's Encrypt ?
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span>Gratuit et accessible à tous</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span>Automatisation complète du renouvellement</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span>Sécurise vos communications HTTPS</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span>Reconnu par tous les navigateurs modernes</span>
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
            <p className="text-gray-700 italic">
              💡 Let's Encrypt utilise le protocole ACME (Automatic Certificate Management Environment) pour valider que vous contrôlez le domaine avant de délivrer un certificat.
            </p>
          </div>
        </div>
      ),
    },
    // Slide 2: DNS Resolver
    {
      title: "DNS Resolver - Validation par DNS",
      icon: <Globe className="w-16 h-16 text-purple-500 mb-4" />,
      content: (
        <div className="space-y-6">
          <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
            <h3 className="text-lg font-semibold text-purple-900 mb-3">
              Qu'est-ce que le DNS Resolver ?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Le DNS Resolver (DNS-01 challenge) valide votre domaine en vérifiant que vous pouvez créer un enregistrement DNS spécifique pour votre domaine.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Fonctionnement
            </h3>
            <ol className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-semibold">
                  1
                </span>
                <div>
                  <strong>Demande de certificat :</strong> Vous demandez un certificat à Let's Encrypt
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-semibold">
                  2
                </span>
                <div>
                  <strong>Challenge DNS :</strong> Let's Encrypt vous fournit un token unique
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-semibold">
                  3
                </span>
                <div>
                  <strong>Création d'enregistrement :</strong> Vous créez un enregistrement TXT DNS avec le token
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-semibold">
                  4
                </span>
                <div>
                  <strong>Vérification :</strong> Let's Encrypt interroge les serveurs DNS pour valider
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-semibold">
                  5
                </span>
                <div>
                  <strong>Émission :</strong> Si validé, le certificat est délivré
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
            <p className="text-gray-700 italic">
              🔐 Exemple d'enregistrement DNS : <code className="bg-white px-2 py-1 rounded">_acme-challenge.example.com TXT "token-valeur"</code>
            </p>
          </div>
        </div>
      ),
    },
    // Slide 3: HTTP Resolver
    {
      title: "HTTP Resolver - Validation par HTTP",
      icon: <Server className="w-16 h-16 text-green-500 mb-4" />,
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
            <h3 className="text-lg font-semibold text-green-900 mb-3">
              Qu'est-ce que le HTTP Resolver ?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Le HTTP Resolver (HTTP-01 challenge) valide votre domaine en vérifiant que vous pouvez placer un fichier spécifique sur votre serveur web accessible via HTTP.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Fonctionnement
            </h3>
            <ol className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold">
                  1
                </span>
                <div>
                  <strong>Demande de certificat :</strong> Vous demandez un certificat à Let's Encrypt
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold">
                  2
                </span>
                <div>
                  <strong>Challenge HTTP :</strong> Let's Encrypt vous fournit un token et une clé
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold">
                  3
                </span>
                <div>
                  <strong>Création de fichier :</strong> Vous placez un fichier à <code className="bg-gray-100 px-2 py-1 rounded text-sm">/.well-known/acme-challenge/</code>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold">
                  4
                </span>
                <div>
                  <strong>Vérification :</strong> Let's Encrypt fait une requête HTTP pour récupérer le fichier
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold">
                  5
                </span>
                <div>
                  <strong>Émission :</strong> Si validé, le certificat est délivré
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl">
            <p className="text-gray-700 italic">
              📁 Exemple de chemin : <code className="bg-white px-2 py-1 rounded">http://example.com/.well-known/acme-challenge/token-fichier</code>
            </p>
          </div>
        </div>
      ),
    },
    // Slide 4: Comparison
    {
      title: "Comparaison DNS vs HTTP",
      icon: <FileText className="w-16 h-16 text-orange-500 mb-4" />,
      content: (
        <div className="space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-xl shadow-md overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <th className="p-4 text-left font-semibold">Critère</th>
                  <th className="p-4 text-left font-semibold">DNS Resolver</th>
                  <th className="p-4 text-left font-semibold">HTTP Resolver</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-900">Complexité</td>
                  <td className="p-4 text-gray-700">Plus complexe</td>
                  <td className="p-4 text-gray-700">Plus simple</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-900">Accès requis</td>
                  <td className="p-4 text-gray-700">Accès DNS/API du fournisseur</td>
                  <td className="p-4 text-gray-700">Accès serveur web</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-900">Wildcards</td>
                  <td className="p-4 text-gray-700 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Supporté (*.example.com)
                  </td>
                  <td className="p-4 text-gray-700 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-500" />
                    Non supporté
                  </td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-900">Port 80 requis</td>
                  <td className="p-4 text-gray-700 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-green-500" />
                    Non
                  </td>
                  <td className="p-4 text-gray-700 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-500" />
                    Oui
                  </td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-900">Serveur interne</td>
                  <td className="p-4 text-gray-700 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Possible
                  </td>
                  <td className="p-4 text-gray-700 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-500" />
                    Difficile
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-900">Vitesse</td>
                  <td className="p-4 text-gray-700 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-yellow-500" />
                    Propagation DNS (minutes)
                  </td>
                  <td className="p-4 text-gray-700 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-green-500" />
                    Immédiat
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Cas d'usage DNS
              </h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Certificats wildcard</li>
                <li>• Serveurs internes/privés</li>
                <li>• Automatisation via API</li>
                <li>• Port 80 non disponible</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Cas d'usage HTTP
              </h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Domaine unique</li>
                <li>• Serveur web public</li>
                <li>• Configuration simple</li>
                <li>• Validation rapide</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    // Slide 5: Conclusion
    {
      title: "Conclusion et Recommandations",
      icon: <CheckCircle className="w-16 h-16 text-green-500 mb-4" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-xl border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Comment choisir ?
            </h3>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                Le choix entre DNS et HTTP Resolver dépend principalement de votre infrastructure et de vos besoins :
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-purple-100 p-6 rounded-xl border-2 border-purple-300 transform transition-transform hover:scale-105">
              <h4 className="text-xl font-bold text-purple-900 mb-3 flex items-center gap-2">
                <Globe className="w-6 h-6" />
                Choisissez DNS si :
              </h4>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">→</span>
                  <span>Vous avez besoin de certificats wildcard</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">→</span>
                  <span>Votre serveur est interne ou derrière un firewall</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">→</span>
                  <span>Le port 80 n'est pas disponible</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">→</span>
                  <span>Vous avez accès à l'API DNS</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-100 p-6 rounded-xl border-2 border-green-300 transform transition-transform hover:scale-105">
              <h4 className="text-xl font-bold text-green-900 mb-3 flex items-center gap-2">
                <Server className="w-6 h-6" />
                Choisissez HTTP si :
              </h4>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">→</span>
                  <span>Vous avez un domaine unique</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">→</span>
                  <span>Votre serveur web est public</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">→</span>
                  <span>Vous voulez une configuration simple</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">→</span>
                  <span>Le port 80 est accessible</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border-l-4 border-yellow-500">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-yellow-600" />
              Points clés à retenir
            </h4>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Les deux méthodes sont sécurisées et fiables</li>
              <li>✓ DNS est plus flexible mais plus complexe</li>
              <li>✓ HTTP est plus rapide mais plus limité</li>
              <li>✓ Let's Encrypt est gratuit dans les deux cas</li>
              <li>✓ Les certificats sont valables 90 jours et renouvelables automatiquement</li>
            </ul>
          </div>

          <div className="text-center">
            <p className="text-gray-600 text-lg">
              🎉 Vous êtes maintenant prêt à choisir la meilleure méthode pour votre projet !
            </p>
          </div>
        </div>
      ),
    },
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg px-6 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              type="button"
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Retour au chat</span>
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              Guide Let's Encrypt
            </h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="hidden sm:inline">Diapositive</span>
            <span className="font-semibold text-purple-600">
              {currentSlide + 1} / {slides.length}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl">
          {/* Slide Container */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 min-h-[600px] transform transition-all duration-500 animate-fadeIn">
            {/* Slide Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center animate-bounce-slow">
                {slides[currentSlide].icon}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {slides[currentSlide].title}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
            </div>

            {/* Slide Content */}
            <div className="text-left animate-slideIn">
              {slides[currentSlide].content}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
                currentSlide === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-white text-purple-600 shadow-lg hover:shadow-xl"
              }`}
              type="button"
            >
              <ChevronLeft className="w-5 h-5" />
              Précédent
            </button>

            {/* Slide Indicators */}
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={`slide-${index}`}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide
                      ? "bg-white w-8 shadow-lg"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                  type="button"
                  aria-label={`Aller à la diapositive ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
                currentSlide === slides.length - 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-white text-purple-600 shadow-lg hover:shadow-xl"
              }`}
              type="button"
            >
              Suivant
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>

      {/* Custom animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in;
        }

        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
