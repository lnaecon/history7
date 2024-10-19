import React, { useState } from 'react';
import { 
  AlertCircle, 
  CheckCircle, 
  MapPin, 
  Ship, 
  Book, 
  Globe, 
  Coins, 
  Users, 
  Building, 
  Clock 
} from 'lucide-react';
import { Card, CardContent, CardHeader } from './components/ui/card';
import { Button } from './components/ui/button';
import './App.css';

const quizData = [
  {
    question: "Ai là người dẫn đầu đoàn thám hiểm hoàn thành chuyến đi đường biển vòng quanh thế giới từ năm 1519-1522? 🌍🚢",
    icon: <Ship className="text-blue-500" />,
    answers: [
      { text: "A: Ma-ghien-lăng", isCorrect: true, explanation: "A: Đúng! Ma-ghien-lăng dẫn đầu đoàn thám hiểm này. 🎉" },
      { text: "B: Cô-lôm-bô", isCorrect: false, explanation: "B: Sai rồi. Cô-lôm-bô phát hiện châu Mỹ năm 1492. 😕" },
      { text: "C: Đi-a-xơ", isCorrect: false, explanation: "C: Sai rồi. Đi-a-xơ đến mũi Hảo Vọng năm 1487. 😔" },
      { text: "D: Va-xcô đơ Ga-ma", isCorrect: false, explanation: "D: Sai rồi. Ga-ma tìm ra đường biển đến Ấn Độ năm 1497-1498. 😞" }
    ],
    historicalContext: "Ma-ghien-lăng đã không sống sót để hoàn thành chuyến đi. Ông bị giết ở Philippines năm 1521, nhưng đoàn thám hiểm của ông vẫn tiếp tục và hoàn thành chuyến đi vòng quanh thế giới. 🌍🚢"
  },
  {
    question: "Hệ quả nào sau đây KHÔNG phải là kết quả của các cuộc phát kiến địa lí? 🌎🧭",
    icon: <Globe className="text-green-500" />,
    answers: [
      { text: "A: Mở ra con đường mới", isCorrect: false, explanation: "A: Sai rồi - Đây là hệ quả của phát kiến địa lí. 🛣️" },
      { text: "B: Thúc đẩy hàng hải quốc tế", isCorrect: false, explanation: "B: Sai rồi - Đây là hệ quả của phát kiến địa lí. ⛵" },
      { text: "C: Chấm dứt chế độ nô lệ", isCorrect: true, explanation: "C: Đúng! Phát kiến địa lí thực tế dẫn đến nạn buôn bán nô lệ. 🔗" },
      { text: "D: Bắt đầu xâm chiếm thuộc địa", isCorrect: false, explanation: "D: Sai rồi - Đây là hệ quả của phát kiến địa lí. 🏴‍☠️" }
    ],
    historicalContext: "Mặc dù các cuộc phát kiến địa lí mang lại nhiều lợi ích, chúng cũng gây ra nhiều hậu quả tiêu cực. Ví dụ, ước tính có khoảng 12 triệu người châu Phi đã bị bắt làm nô lệ và vận chuyển sang châu Mỹ trong suốt thời kỳ buôn bán nô lệ xuyên Đại Tây Dương. 😔🌍"
  },
  {
    question: "Hiện tượng nào đánh dấu sự khởi đầu của quá trình tích lũy vốn ban đầu ở Anh? 💰🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    icon: <Coins className="text-yellow-500" />,
    answers: [
      { text: "A: Phát minh máy hơi nước", isCorrect: false, explanation: "A: Sai rồi - Máy hơi nước được phát minh sau này. 🚂" },
      { text: "B: \"Rào đất cướp ruộng\"", isCorrect: true, explanation: "B: Đúng! Đây là hiện tượng đặc trưng ở Anh thời kỳ này. 🌾" },
      { text: "C: Khám phá châu Mỹ", isCorrect: false, explanation: "C: Sai rồi - Đây là một cuộc phát kiến địa lí. 🗺️" },
      { text: "D: Cách mạng công nghiệp", isCorrect: false, explanation: "D: Sai rồi - Cách mạng công nghiệp xảy ra sau này. 🏭" }
    ],
    historicalContext: "\"Rào đất cướp ruộng\" là một quá trình kéo dài từ thế kỷ 15 đến thế kỷ 19 ở Anh. Nó không chỉ tạo ra nguồn vốn ban đầu cho tư bản mà còn tạo ra một lượng lớn lao động tự do - yếu tố quan trọng cho sự phát triển của chủ nghĩa tư bản sau này. 🌱💼"
  },
  {
    question: "Đặc điểm nào sau đây KHÔNG phải là đặc điểm của giai cấp tư sản trong giai đoạn đầu? 👨‍💼💼",
    icon: <Users className="text-purple-500" />,
    answers: [
      { text: "A: Có thế lực kinh tế", isCorrect: false, explanation: "A: Sai rồi - Đây là đặc điểm của giai cấp tư sản. 💰" },
      { text: "B: Nắm quyền lực chính trị", isCorrect: true, explanation: "B: Đúng! Tư sản lúc này chưa có quyền lực chính trị. 🏛️" },
      { text: "C: Là chủ các công trường thủ công", isCorrect: false, explanation: "C: Sai rồi - Đây là đặc điểm của giai cấp tư sản. 🏭" },
      { text: "D: Xuất thân từ thương nhân giàu có", isCorrect: false, explanation: "D: Sai rồi - Đây là nguồn gốc của giai cấp tư sản. 💼" }
    ],
    historicalContext: "Sự hình thành của hai giai cấp mới này đánh dấu sự khởi đầu của một cuộc cách mạng xã hội sâu sắc ở châu Âu. Mâu thuẫn giữa hai giai cấp này sẽ trở thành động lực chính cho sự phát triển của xã hội tư bản trong những thế kỷ tiếp theo. 🔄🌍"
  },
  {
    question: "Hiện tượng \"rào đất cướp ruộng\" diễn ra mạnh mẽ nhất ở quốc gia nào? 🌾🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    icon: <MapPin className="text-red-500" />,
    answers: [
      { text: "A: Pháp", isCorrect: false, explanation: "A: Sai rồi - Hiện tượng này phổ biến nhất ở Anh. 🇫🇷" },
      { text: "B: Đức", isCorrect: false, explanation: "B: Sai rồi - Hiện tượng này phổ biến nhất ở Anh. 🇩🇪" },
      { text: "C: Anh", isCorrect: true, explanation: "C: Đúng! Đây là nơi hiện tượng này diễn ra mạnh mẽ nhất. 🇬🇧" },
      { text: "D: Tây Ban Nha", isCorrect: false, explanation: "D: Sai rồi - Hiện tượng này phổ biến nhất ở Anh. 🇪🇸" }
    ],
    historicalContext: "Quá trình tích lũy vốn ban đầu của giai cấp tư sản thường được gọi là \"tích lũy nguyên thủy\". Đây là giai đoạn chuyển tiếp từ chế độ phong kiến sang chủ nghĩa tư bản, diễn ra từ thế kỷ 16 đến thế kỷ 18 ở châu Âu. 💰🏰➡️🏭"
  },
  {
    question: "Đặc điểm nào sau đây KHÔNG phải là đặc điểm của quan hệ sản xuất tư bản chủ nghĩa? 🏭👨‍🏭",
    icon: <Building className="text-orange-500" />,
    answers: [
      { text: "A: Chủ sở hữu tư liệu sản xuất", isCorrect: false, explanation: "A: Sai rồi - Đây là đặc điểm của quan hệ SXTBCN. 🏭" },
      { text: "B: Công nhân làm thuê", isCorrect: false, explanation: "B: Sai rồi - Đây là đặc điểm của quan hệ SXTBCN. 👨‍🏭" },
      { text: "C: Bóc lột thông qua tiền lương", isCorrect: false, explanation: "C: Sai rồi - Đây là đặc điểm của quan hệ SXTBCN. 💰" },
      { text: "D: Phân phối bình đẳng", isCorrect: true, explanation: "D: Đúng! Quan hệ SXTBCN dựa trên sự bóc lột, không bình đẳng. ⚖️" }
    ],
    historicalContext: "Sự hình thành quan hệ sản xuất tư bản chủ nghĩa đánh dấu sự ra đời của một phương thức sản xuất mới, tiến bộ hơn so với phương thức sản xuất phong kiến. Điều này tạo tiền đề cho cuộc Cách mạng công nghiệp sau này. 🏛️➡️🏭"
  },
  {
    question: "Yếu tố nào sau đây KHÔNG phải là ảnh hưởng trực tiếp của các cuộc phát kiến địa lý đến sự phát triển của chủ nghĩa tư bản? 🌍💼",
    icon: <Globe className="text-blue-500" />,
    answers: [
      { text: "A: Mở rộng thị trường", isCorrect: false, explanation: "A: Sai rồi - Đây là ảnh hưởng trực tiếp. 🌐" },
      { text: "B: Cung cấp nguồn nguyên liệu", isCorrect: false, explanation: "B: Sai rồi - Đây là ảnh hưởng trực tiếp. 🏭" },
      { text: "C: Tích lũy vốn ban đầu", isCorrect: false, explanation: "C: Sai rồi - Đây là ảnh hưởng trực tiếp. 💰" },
      { text: "D: Cải cách tôn giáo", isCorrect: true, explanation: "D: Đúng! Cải cách tôn giáo không phải là hệ quả trực tiếp của phát kiến địa lý. ⛪" }
    ],
    historicalContext: "Các cuộc phát kiến địa lý không chỉ mở rộng bản đồ thế giới mà còn tạo ra một cuộc cách mạng trong tư duy của người châu Âu. Họ bắt đầu nhìn nhận thế giới một cách khoa học hơn, góp phần thúc đẩy phong trào Phục hưng và cách mạng khoa học. 🌍🔬📚"
  }
];

const QuizDashboard = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isEssayOpen, setIsEssayOpen] = useState(false);

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => (prev + 1) % quizData.length);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const toggleReview = () => {
    setIsReviewOpen((prev) => !prev);
  };

  const toggleEssay = () => {
    setIsEssayOpen((prev) => !prev);
  };

  const currentQuizData = quizData[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-100 to-stone-300 flex items-center justify-center p-4 relative">

      {/* Nút Tự luận - Góc Trái */}
      <Button
        className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        onClick={toggleEssay}
      >
        {isEssayOpen ? 'Đóng lại' : 'Tự luận'}
      </Button>

      {/* Nút Ôn tập kiến thức - Góc Phải */}
      <Button
        className="absolute top-4 right-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        onClick={toggleReview}
      >
        {isReviewOpen ? 'Đóng lại' : 'Ôn tập kiến thức'}
      </Button>

      {/* Phần Nội dung Ôn tập kiến thức */}
      {isReviewOpen && (
        <div className="absolute top-16 left-0 right-0 mx-auto w-full max-w-3xl bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg z-10 overflow-y-auto max-h-[80vh]">
          <h2 className="text-2xl font-bold mb-4">Ôn Tập Kiến Thức</h2>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">🌍 <strong>1. Các cuộc phát kiến địa lí lớn</strong></h3>
            <p className="ml-4">
              Bồ Đào Nha và Tây Ban Nha là những nước tiên phong trong thám hiểm đường biển.
            </p>
            <p className="ml-4 font-semibold">Các cuộc phát kiến chính:</p>
            <ul className="list-disc list-inside ml-8">
              <li>1487: B.Đi-a-xơ đến mũi Hảo Vọng (cực Nam châu Phi) 🧭</li>
              <li>1492: C.Cô-lôm-bô phát hiện châu Mỹ 🌎</li>
              <li>1497-1498: V.Ga-ma tìm ra đường biển đến Ấn Độ 🚢</li>
              <li>1519-1522: Ph. Ma-ghien-lăng hoàn thành chuyến đi vòng quanh thế giới 🌐</li>
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">📈 <strong>2. Hệ quả của các cuộc phát kiến địa lí</strong></h3>
            <ul className="list-disc list-inside ml-8">
              <li>Mở ra con đường mới, tìm ra vùng đất mới, thị trường mới 🌍</li>
              <li>Thúc đẩy hàng hải quốc tế phát triển ⛴️</li>
              <li>Châu Âu có được nhiều vàng bạc và kiến thức mới 💰</li>
              <li>Dẫn đến nạn buôn bán nô lệ da đen ⛓️</li>
              <li>Bắt đầu quá trình xâm chiếm, cướp bóc thuộc địa 🏴‍☠️</li>
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">🏛️ <strong>3. Sự nảy sinh chủ nghĩa tư bản ở Tây Âu</strong></h3>
            <ul className="list-disc list-inside ml-8">
              <li>Quý tộc và thương nhân châu Âu cướp bóc tài nguyên từ thuộc địa 🌍</li>
              <li>Hiện tượng "rào đất cướp ruộng" xảy ra, đặc biệt ở Anh 🏞️</li>
              <li>Tư sản tích lũy vốn ban đầu và có nguồn lao động làm thuê 🏗️</li>
              <li>Xuất hiện các công trường thủ công, công ty thương mại lớn 🏢</li>
              <li>Hình thành quan hệ chủ - thợ trong sản xuất ⚙️</li>
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">⚔️ <strong>4. Biến đổi trong xã hội Tây Âu</strong></h3>
            <ul className="list-disc list-inside ml-8">
              <li>Hình thành hai giai cấp chính:</li>
              <ul className="list-disc list-inside ml-8">
                <li><span className="font-semibold">Giai cấp tư sản:</span> chủ công trường, nhà buôn lớn, có thế lực kinh tế 💼</li>
                <li><span className="font-semibold">Giai cấp vô sản:</span> lao động làm thuê cho tư bản 🛠️</li>
              </ul>
              <li>Tư sản có địa vị kinh tế cao nhưng chưa có quyền lực chính trị 👑</li>
              <li>Vô sản ban đầu chỉ là lực lượng ủng hộ tư sản chống phong kiến 🏰</li>
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">💰 <strong>5. Quá trình tích lũy vốn ban đầu của giai cấp tư sản</strong></h3>
            <ul className="list-disc list-inside ml-8">
              <li>Cướp bóc tài nguyên, của cải từ các thuộc địa ở châu Á, châu Phi, châu Mỹ 🌍</li>
              <li>"Rào đất cướp ruộng" - tước đoạt ruộng đất của nông dân 🏞️</li>
              <li>Buôn bán nô lệ da đen ⛓️</li>
              <li>Mở rộng kinh doanh, lập công trường thủ công và công ty thương mại 🏗️</li>
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">⚙️ <strong>6. Sự hình thành quan hệ sản xuất tư bản chủ nghĩa</strong></h3>
            <ul className="list-disc list-inside ml-8">
              <li>Xuất hiện hình thức kinh doanh tư bản chủ nghĩa 🏢</li>
              <li>Quan hệ chủ - thợ trong các công trường thủ công 🛠️</li>
              <li>Chủ sở hữu tư liệu sản xuất và công nhân làm thuê 💼</li>
              <li>Bóc lột thông qua tiền lương 💵</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold">🌍 <strong>7. Ảnh hưởng của các cuộc phát kiến địa lý đến sự phát triển của chủ nghĩa tư bản</strong></h3>
            <ul className="list-disc list-inside ml-8">
              <li>Mở rộng thị trường, thúc đẩy thương mại quốc tế 🌐</li>
              <li>Cung cấp nguồn nguyên liệu và lao động giá rẻ từ thuộc địa 🌾</li>
              <li>Tạo điều kiện tích lũy vốn ban đầu cho giai cấp tư sản 💰</li>
              <li>Thúc đẩy sự phát triển của khoa học kỹ thuật 🛠️</li>
            </ul>
          </div>
        </div>
      )}


      {/* Phần Nội dung Tự luận */}
      {isEssayOpen && (
        <div className="absolute top-16 left-0 right-0 mx-auto w-full max-w-3xl bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg z-10 overflow-y-auto max-h-[80vh]">
          <h2 className="text-2xl font-bold mb-4">Tự Luận</h2>

          <p className="font-semibold text-xl mb-2">✨ <strong>Câu 1: Phân tích tác động của các cuộc phát kiến địa lí (cuối thế kỉ XV – đầu thế kỉ XVI)</strong></p>
          <p className="mt-2">
            Các cuộc phát kiến địa lí cuối thế kỉ XV - đầu thế kỉ XVI có nhiều tác động quan trọng:
          </p>
          <ol className="list-decimal list-inside ml-6 mt-2">
            <li>
              <span className="font-semibold">Thứ nhất, mở ra con đường mới và tìm ra vùng đất mới <MapPin className="inline-block" />:</span> Ví dụ như C.Cô-lôm-bô đã tìm ra châu Mỹ năm 1492. Điều này giúp người châu Âu biết thêm về thế giới và tìm ra thị trường mới để buôn bán.
            </li>
            <li className="mt-2">
              <span className="font-semibold">Thứ hai, đem về cho châu Âu rất nhiều vàng bạc và kiến thức mới <Coins className="inline-block" />:</span> Tuy nhiên, nó cũng dẫn đến việc các nước châu Âu bắt đầu chiếm đóng và bóc lột thuộc địa ở những vùng đất mới.
            </li>
            <li className="mt-2">
              <span className="font-semibold">Thứ ba, phát sinh nạn buôn bán nô lệ da đen <Users className="inline-block" />:</span> Người châu Âu bắt người châu Phi làm nô lệ và đưa họ sang châu Mỹ để làm việc. Đây là một hậu quả rất tồi tệ.
            </li>
          </ol>
          <p className="mt-4">
            Tác động quan trọng nhất là việc mở rộng hiểu biết về thế giới 🌍, vì nó thúc đẩy sự phát triển của khoa học và thương mại quốc tế.
          </p>

          <p className="font-semibold text-xl mt-6">📖 <strong>Câu 2: Trình bày sự nảy sinh của chủ nghĩa tư bản và những biến đổi chính trong xã hội Tây Âu sau các cuộc phát kiến địa lí</strong></p>
          <p className="mt-2">
            Sau các cuộc phát kiến địa lí, chủ nghĩa tư bản bắt đầu nảy sinh ở Tây Âu:
          </p>
          <ol className="list-decimal list-inside ml-6 mt-2">
            <li>
              <span className="font-semibold">Đầu tiên, giới quý tộc và thương nhân châu Âu cướp bóc tài nguyên từ các thuộc địa <Globe className="inline-block" />:</span> Ở Anh, họ còn "rào đất cướp ruộng" của nông dân. Nhờ đó, họ tích lũy được nhiều vốn.
            </li>
            <li className="mt-2">
              <span className="font-semibold">Tiếp theo, họ dùng số vốn này để mở rộng kinh doanh <Building className="inline-block" />:</span> Lập các công trường thủ công và công ty thương mại lớn. Quan hệ giữa chủ và thợ - tức là quan hệ tư bản chủ nghĩa - dần hình thành.
            </li>
          </ol>
          <p className="mt-4">
            Xã hội Tây Âu cũng có những thay đổi lớn. Hai giai cấp mới xuất hiện:
          </p>
          <ul className="list-disc list-inside ml-6 mt-2">
            <li><span className="font-semibold">Giai cấp tư sản <Coins className="inline-block" />:</span> là những chủ công trường, chủ buôn giàu có. Họ có tiền nhưng chưa có quyền lực chính trị.</li>
            <li className="mt-2"><span className="font-semibold">Giai cấp vô sản <Users className="inline-block" />:</span> là những người lao động làm thuê. Ban đầu họ ủng hộ tư sản để chống lại chế độ phong kiến.</li>
          </ul>
          <p className="mt-4">
            Sự thay đổi quan trọng nhất là việc hình thành quan hệ sản xuất mới - quan hệ tư bản chủ nghĩa. Nó dần thay thế quan hệ phong kiến cũ và tạo nền tảng cho xã hội hiện đại sau này.
          </p>
        </div>
      )}

      <Card className="w-full max-w-3xl bg-white/80 backdrop-blur-sm shadow-xl z-0">
        <CardHeader className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Lịch Sử Lớp 7: Ôn Tập Kiến Thức</h1>
          <div className="flex justify-center space-x-2 mb-4">
            <MapPin className="text-blue-500" />
            <Ship className="text-green-500" />
            <Book className="text-red-500" />
          </div>
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-semibold mb-6 text-center">{currentQuizData.question}</h2>
          <div className="space-y-4">
            {currentQuizData.answers.map((answer, index) => (
              <Button
                key={index}
                className={`w-full text-left py-3 px-4 rounded-lg transition-colors ${
                  selectedAnswer === index
                    ? answer.isCorrect
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                onClick={() => handleAnswerClick(index)}
                disabled={showExplanation}
              >
                {answer.text}
              </Button>
            ))}
          </div>
          {showExplanation && (
            <div className="mt-6 p-4 bg-white rounded-lg shadow">
              <p className="text-lg mb-2">
                {selectedAnswer !== null && (
                  <>
                    {currentQuizData.answers[selectedAnswer].isCorrect ? (
                      <CheckCircle className="inline-block mr-2 text-green-500" />
                    ) : (
                      <AlertCircle className="inline-block mr-2 text-red-500" />
                    )}
                    {currentQuizData.answers[selectedAnswer].explanation}
                  </>
                )}
              </p>
              <p className="text-md mt-4">{currentQuizData.historicalContext}</p>
              <Button className="mt-4" onClick={handleNextQuestion}>
                Câu hỏi tiếp theo
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizDashboard;
