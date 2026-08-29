(() => {
  const SUBSTANCES = {
    iron: { id: "iron", name: "철가루", color: "#9aa3ad", magnetic: true, state: "solid", soluble: false, size: "fine", density: 7.87, bp: 2862, sublimes: false, miscibleWater: false },
    sand: { id: "sand", name: "모래", color: "#c4a574", magnetic: false, state: "solid", soluble: false, size: "medium", density: 2.65, bp: 2230, sublimes: false, miscibleWater: false },
    gravel: { id: "gravel", name: "자갈", color: "#7a7468", magnetic: false, state: "solid", soluble: false, size: "coarse", density: 2.7, bp: 2200, sublimes: false, miscibleWater: false },
    salt: { id: "salt", name: "소금", color: "#f1f5f9", magnetic: false, state: "solid", soluble: true, size: "fine", density: 2.16, bp: 1465, sublimes: false, miscibleWater: false },
    iodine: { id: "iodine", name: "아이오딘", color: "#6b2d8b", magnetic: false, state: "solid", soluble: false, size: "fine", density: 4.93, bp: 184, sublimes: true, miscibleWater: false },
    soil: { id: "soil", name: "흙", color: "#5c4033", magnetic: false, state: "solid", soluble: false, size: "fine", density: 1.6, bp: 2000, sublimes: false, miscibleWater: false },
    water: { id: "water", name: "물", color: "#38bdf8", magnetic: false, state: "liquid", soluble: false, size: null, density: 1, bp: 100, sublimes: false, miscibleWater: true },
    ethanol: { id: "ethanol", name: "에탄올", color: "#86efac", magnetic: false, state: "liquid", soluble: false, size: null, density: 0.79, bp: 78, sublimes: false, miscibleWater: true },
    oil: { id: "oil", name: "식용유", color: "#f4d03f", magnetic: false, state: "liquid", soluble: false, size: null, density: 0.91, bp: 300, sublimes: false, miscibleWater: false },
    ink: { id: "ink", name: "사인펜 잉크", color: "#8b5cf6", magnetic: false, state: "solution", soluble: true, size: null, density: 1, bp: 100, sublimes: false, miscibleWater: true, pigments: true }
  };

  const METHODS = [
    { id: "magnet", name: "자석 분리", prop: "자성", icon: "🧲", why: "한쪽만 자석에 붙을 때", example: "철가루 + 모래", color: "#94a3b8" },
    { id: "sieve", name: "체질", prop: "입자 크기", icon: "🕸️", why: "알갱이 크기가 다를 때", example: "모래 + 자갈", color: "#d6b17a" },
    { id: "filter", name: "거름(여과)", prop: "용해도·입자", icon: "🫗", why: "액체에 안 녹는 고체가 있을 때", example: "모래 + 물, 흙탕물", color: "#38bdf8" },
    { id: "evaporate", name: "증발·결정화", prop: "끓는점·용해도", icon: "🔥", why: "녹아 있는 고체를 얻고 싶을 때", example: "소금물 → 소금 결정", color: "#fbbf24" },
    { id: "distill", name: "증류", prop: "끓는점", icon: "⚗️", why: "서로 섞이는 액체의 끓는점이 다를 때", example: "물 + 에탄올", color: "#86efac" },
    { id: "funnel", name: "분액깔때기", prop: "밀도·섞임", icon: "🧪", why: "서로 안 섞이는 액체일 때", example: "물 + 식용유", color: "#f4d03f" },
    { id: "chroma", name: "크로마토그래피", prop: "흡착력", icon: "🎨", why: "색소가 종이·용매에 달라붙는 정도가 다를 때", example: "사인펜 잉크", color: "#c084fc" },
    { id: "sublime", name: "승화", prop: "승화성", icon: "💜", why: "한쪽만 고체가 바로 기체가 될 때", example: "아이오딘 + 모래", color: "#a78bfa" }
  ];

  const PRESETS = [
    {
      id: "magnet", title: "철가루 + 모래",
      why: "자성의 차이를 이용합니다. 철만 자석에 붙고, 모래는 붙지 않습니다.",
      materials: "접시, 막대자석, 철가루와 모래 혼합물",
      result: "자석에는 철가루, 접시에는 모래가 남습니다. 한 가지 성질(자성)만으로 바로 나눌 수 있습니다.",
      substances: ["iron", "sand"],
      steps: [
        { title: "혼합물 확인", action: "회색 철가루와 갈색 모래가 뒤섞인 상태를 먼저 봅니다.", see: "두 물질이 한곳에 섞여 있어 아직 나눌 수 없습니다.", reason: "분리 전에 ‘무엇이 섞였는지’를 확인해야 알맞은 성질을 고를 수 있습니다." },
        { title: "접시에 펼치기", action: "혼합물을 접시에 얇게 펼칩니다.", see: "입자가 겹치지 않게 퍼져 자석이 각 알갱이에 잘 닿습니다.", reason: "쌓여 있으면 철가루가 모래 밑에 숨어 덜 붙을 수 있습니다." },
        { title: "자석 가까이", action: "막대자석을 혼합물 위쪽으로 천천히 가져갑니다. 접시에 직접 비비지 않습니다.", see: "자석이 가까워져도 모래는 꿈쩍하지 않습니다.", reason: "모래는 자성이 없고, 철만 자기력의 영향을 받습니다." },
        { title: "철가루만 붙음", action: "자석을 조금 더 가까이 댑니다.", see: "철가루가 자석 쪽으로 날아와 달라붙습니다. 모래는 접시에 남습니다.", reason: "자기력은 자성 물질만 끌어당깁니다." },
        { title: "자석 들어 올리기", action: "철가루가 붙은 자석을 천천히 들어 올립니다.", see: "철가루가 자석을 따라 올라가고, 접시에는 모래만 보입니다.", reason: "붙어 있는 철을 물리적으로 혼합물 밖으로 꺼내는 단계입니다." },
        { title: "분리 완료", action: "자석의 철가루와 접시의 모래를 따로 모읍니다.", see: "두 물질이 완전히 갈라져 있습니다.", reason: "자성이 다른 고체는 거름이나 증발보다 자석이 가장 빠릅니다." }
      ]
    },
    {
      id: "filter", title: "모래 + 물",
      why: "모래는 물에 녹지 않고 입자도 커서, 거름종이 구멍을 통과하지 못합니다.",
      materials: "깔때기, 거름종이, 삼각 플라스크, 비커, 모래와 물",
      result: "거름종이 위에는 모래(거름), 플라스크에는 맑은 물(여액)이 모입니다.",
      substances: ["sand", "water"],
      steps: [
        { title: "거름종이 접기", action: "거름종이를 반으로 두 번 접어 원뿔 모양을 만들고 깔때기에 넣습니다.", see: "종이가 깔때기 벽을 따라 밀착됩니다.", reason: "틈이 있으면 모래가 옆으로 샐 수 있습니다." },
        { title: "장치 설치", action: "깔때기를 삼각 플라스크 위에 올립니다. 끝은 플라스크 입구 안에 넣습니다.", see: "위에서 걸러진 액체가 아래로 떨어질 준비가 됩니다.", reason: "거름(여과)은 ‘구멍보다 큰 고체’와 ‘구멍보다 작은 액체’를 나눕니다." },
        { title: "혼합물 따르기", action: "모래와 물을 유리막대로 유도하며 천천히 따릅니다. 한 번에 들이붓지 않습니다.", see: "혼합물이 거름종이 위로 내려옵니다.", reason: "급하게 부으면 종이가 찢어지거나 액체가 넘칩니다." },
        { title: "물만 통과", action: "그대로 기다립니다. 필요하면 증류수를 조금 더 부어 모래를 씻습니다.", see: "물은 종이 구멍을 통과해 방울져 떨어지고, 모래는 종이에 남습니다.", reason: "모래 입자가 거름종이 구멍보다 크기 때문입니다. 물에 녹지 않는다는 점도 중요합니다." },
        { title: "여액 모으기", action: "아래 플라스크에 모인 액체를 확인합니다. 이 액체를 여액이라고 합니다.", see: "플라스크 속 물은 점점 맑아집니다.", reason: "고체 불순물이 위에서 걸러졌기 때문입니다." },
        { title: "분리 완료", action: "거름종이를 펼쳐 모래를 확인하고, 여액과 비교합니다.", see: "위=젖은 모래, 아래=물. 두 물질이 나뉘었습니다.", reason: "불용성 고체 + 액체 조합에서는 거름이 기본 방법입니다." }
      ]
    },
    {
      id: "evaporate", title: "소금물",
      why: "소금은 물에 녹아 눈에 안 보입니다. 물을 기체로 날리면 소금만 고체로 남습니다.",
      materials: "증발 접시, 삼발이, 알코올램프(또는 핫플레이트), 소금물",
      result: "물은 수증기로 사라지고, 접시 바닥에 하얀 소금 결정이 남습니다.",
      substances: ["salt", "water"],
      steps: [
        { title: "소금물 담기", action: "증발 접시에 소금물을 얇게 담습니다.", see: "액체가 맑아 소금 알갱이는 보이지 않습니다.", reason: "소금이 이미 물에 녹아 균일 혼합물(용액)이 되었기 때문입니다." },
        { title: "약하게 가열", action: "접시를 삼발이에 올리고 약한 불로 가열합니다. 세게 끓이지 않습니다.", see: "접시 가장자리부터 온도가 오릅니다.", reason: "급가열하면 액체가 튀어 소금이 손실됩니다." },
        { title: "물이 끓기 시작", action: "기포가 생기는 것을 관찰합니다.", see: "물 분자들이 수증기가 되어 위로 올라갑니다.", reason: "물의 끓는점(100℃)에서 액체→기체가 됩니다. 소금의 끓는점은 훨씬 높습니다." },
        { title: "농축", action: "물이 줄어들 때까지 계속 가열합니다.", see: "액체의 양이 줄고, 소금 농도가 높아집니다.", reason: "용매(물)만 달아나 용질(소금)이 과포화에 가까워집니다." },
        { title: "결정이 나타남", action: "불에서 내려 천천히 식히거나, 물이 거의 없어질 때까지 둡니다.", see: "하얀 소금 결정이 접시 바닥에 생깁니다.", reason: "더 이상 녹일 물이 없으면 소금이 고체로 석출됩니다." },
        { title: "분리 완료", action: "남은 고체를 확인합니다. 물을 모으려면 증류가 필요합니다.", see: "접시에는 소금만 남았습니다.", reason: "증발은 ‘녹아 있는 고체’를 얻는 방법입니다. 날아간 물은 회수하지 않습니다." }
      ]
    },
    {
      id: "distill", title: "물 + 에탄올",
      why: "두 액체가 잘 섞이지만 끓는점이 다릅니다. 에탄올 78℃, 물 100℃.",
      materials: "증류 플라스크, 온도계, 냉각기, 받는 플라스크, 물과 에탄올 혼합액",
      result: "먼저 나오는 증류액은 에탄올이 많고, 플라스크에 남는 것은 물에 가깝습니다.",
      substances: ["water", "ethanol"],
      steps: [
        { title: "장치 연결", action: "증류 플라스크–냉각기–받는 플라스크를 연결하고, 냉각기에 찬물이 흐르게 합니다.", see: "기체가 지나갈 길이 파이프처럼 이어집니다.", reason: "끓여 기체로 만든 뒤, 다시 식혀 액체로 받아야 물질을 모을 수 있습니다." },
        { title: "혼합액 가열", action: "증류 플라스크를 가열하며 온도계를 봅니다.", see: "온도가 실온에서 천천히 올라갑니다. 아직 두 액체가 함께 있습니다.", reason: "끓는점에 도달해야 기체가 충분히 발생합니다." },
        { title: "에탄올이 먼저 끓음", action: "온도가 약 78℃ 근처가 되면 관찰을 집중합니다.", see: "초록빛 에탄올 입자가 기체가 되어 위로 올라갑니다. 물은 아직 플라스크에 남습니다.", reason: "끓는점이 낮은 물질이 먼저 기체가 됩니다." },
        { title: "냉각기를 지남", action: "기체가 냉각기 안을 지나게 둡니다. 바깥으로 새지 않게 연결을 확인합니다.", see: "뜨거운 기체가 찬 관을 만나 다시 액체 방울이 됩니다.", reason: "응축(기체→액체)으로 물질을 받아냅니다." },
        { title: "증류액 수집", action: "받는 플라스크에 떨어지는 액체를 모읍니다. 이 액체를 증류액이라고 합니다.", see: "받는 쪽에는 에탄올이, 가열 플라스크에는 물이 남습니다.", reason: "같은 시간에 물보다 에탄올이 훨씬 많이 기화했기 때문입니다." },
        { title: "분리 완료", action: "온도가 100℃ 가까이 오르면 에탄올은 거의 다 나온 것입니다.", see: "끓는점 차이로 두 액체가 나뉘었습니다.", reason: "서로 섞이는 액체는 거름·분액깔때기로는 나눌 수 없고, 증류를 씁니다." }
      ]
    },
    {
      id: "funnel", title: "물 + 식용유",
      why: "기름과 물은 서로 안 섞입니다. 밀도는 물(1.0) > 기름(0.91)이라 물이 아래로 갑니다.",
      materials: "분액깔때기, 받침대, 비커 2개, 물과 식용유",
      result: "먼저 받는 아래층은 물, 나중에 따르는 위층은 기름입니다.",
      substances: ["water", "oil"],
      steps: [
        { title: "혼합액 넣기", action: "꼭지를 닫은 분액깔때기에 물과 식용유를 넣습니다.", see: "흔들면 뿌옇게 섞여 보이지만, 진짜로 한 용액이 된 것은 아닙니다.", reason: "불균일 혼합물입니다. 작은 방울로 흩어졌을 뿐입니다." },
        { title: "가만히 두기", action: "깔때기를 세워 두고 층을 기다립니다. 흔들지 않습니다.", see: "노란 기름이 위로, 파란 물이 아래로 갈라집니다.", reason: "밀도가 작은 액체가 위에 뜹니다." },
        { title: "경계면 확인", action: "두 층의 경계가 선명해질 때까지 기다립니다.", see: "위층=기름, 아래층=물. 중간이 경계면입니다.", reason: "나중에 꼭지를 닫는 기준점이 경계면입니다." },
        { title: "아래층 받기", action: "꼭지를 열어 아래층(물)만 비커에 받습니다. 경계면이 꼭지에 닿기 직전에 닫습니다.", see: "물이 아래로 흘러나오고, 기름은 깔때기에 남습니다.", reason: "아래쪽 꼭지로는 밀도가 큰 층이 먼저 나옵니다." },
        { title: "위층 따로 따르기", action: "남은 기름을 다른 비커로 윗입구에서 따릅니다. 꼭지로 억지로 빼지 않아도 됩니다.", see: "물 비커와 기름 비커가 따로 생깁니다.", reason: "위층을 꼭지로 빼면 관에 남은 물과 다시 섞일 수 있습니다." },
        { title: "분리 완료", action: "두 비커를 비교합니다.", see: "밀도와 ‘안 섞임’ 두 성질을 함께 이용했습니다.", reason: "서로 섞이는 액체(물+에탄올)에는 이 방법을 쓸 수 없습니다." }
      ]
    },
    {
      id: "chroma", title: "사인펜 잉크",
      why: "잉크는 한 색처럼 보여도 여러 색소의 혼합물입니다. 종이에 붙는 힘과 용매를 따라가는 속도가 다릅니다.",
      materials: "거름종이(또는 커피 필터), 사인펜, 용매(물 또는 알코올), 비커",
      result: "한 점이 여러 색 띠로 갈라집니다. 이동 거리가 클수록 용매를 더 잘 따라간 색소입니다.",
      substances: ["ink"],
      steps: [
        { title: "출발선과 점 찍기", action: "종이 아래쪽에서 1~2cm 위에 연한 선을 긋고, 그 위에 사인펜 점을 찍은 뒤 말립니다.", see: "진한 점 하나만 보입니다. 아직 색이 갈라지지 않았습니다.", reason: "점이 용매에 잠기면 색소가 물에 씻겨 실험이 실패합니다." },
        { title: "용매에 끝만 담그기", action: "종이 맨 아래만 용매에 담급니다. 점은 액체에 잠기지 않게 합니다.", see: "용매가 종이 끝에서 스며들기 시작합니다.", reason: "모세관 현상으로 액체가 종이를 타고 올라갑니다." },
        { title: "용매 앞면이 올라감", action: "종이를 고정하고 기다립니다. 흔들지 않습니다.", see: "용매 앞면(젖은 경계)이 점을 지나 위로 이동합니다.", reason: "색소가 용매에 녹아 함께 이동할 준비를 합니다." },
        { title: "색소가 갈라지기 시작", action: "색의 위치가 달라지는지 봅니다.", see: "어떤 색은 거의 제자리, 어떤 색은 빨리 따라 올라갑니다.", reason: "종이에 흡착이 강한 색소는 느리고, 용매에 잘 녹는 색소는 빠릅니다." },
        { title: "띠가 생김", action: "용매 앞면이 위쪽에 오기 전에 꺼냅니다.", see: "보라, 분홍, 파란 띠가 서로 다른 높이에 나타납니다.", reason: "원래 잉크가 여러 색소의 혼합물이었다는 증거입니다." },
        { title: "분리 완료", action: "종이를 말리고 출발선과 각 띠의 위치를 비교합니다.", see: "한 색 점이 여러 성분으로 나뉘었습니다.", reason: "거름으로는 안 나뉘는 균일 혼합물을 흡착력 차이로 나눈 것입니다." }
      ]
    },
    {
      id: "sieve", title: "모래 + 자갈",
      why: "둘 다 고체이고 물에 안 녹습니다. 다른 점은 입자 크기입니다.",
      materials: "체(자갈보다 작고 모래보다 큰 구멍), 접시 2개, 모래와 자갈",
      result: "체 위에는 자갈, 아래 접시에는 모래가 모입니다.",
      substances: ["sand", "gravel"],
      steps: [
        { title: "체 고르기", action: "구멍 크기가 자갈보다 작고 모래보다 큰 체를 준비합니다.", see: "체 구멍이 보입니다.", reason: "구멍이 너무 크면 자갈도 빠지고, 너무 작으면 모래도 안 빠집니다." },
        { title: "혼합물 올리기", action: "모래와 자갈을 체 위에 올립니다.", see: "아직 두 물질이 함께 체에 있습니다.", reason: "흔들기 전에는 크기 차이가 드러나지 않습니다." },
        { title: "가볍게 흔들기", action: "체를 좌우로 흔듭니다. 세게 내리치지 않습니다.", see: "작은 모래가 구멍 쪽으로 미끄러집니다.", reason: "진동이 작은 입자를 구멍 앞으로 보냅니다." },
        { title: "모래가 떨어짐", action: "아래 접시를 받아 둡니다.", see: "모래만 체 구멍으로 떨어집니다. 자갈은 구멍을 못 지나갑니다.", reason: "입자 크기 > 구멍이면 통과하지 못합니다." },
        { title: "자갈만 남음", action: "흔들기를 멈추고 체 위를 확인합니다.", see: "체에는 큰 자갈만, 아래에는 모래만 있습니다.", reason: "같은 고체라도 크기만 다르면 체로 나눌 수 있습니다." },
        { title: "분리 완료", action: "두 접시를 비교합니다.", see: "자성·용해도가 같아도 크기만 다르면 충분합니다.", reason: "철가루+모래처럼 크기가 비슷하면 체질은 어렵고 자석이 낫습니다." }
      ]
    },
    {
      id: "sublime", title: "아이오딘 + 모래",
      why: "아이오딘은 가열하면 고체에서 바로 기체가 됩니다(승화). 모래는 그대로 고체입니다.",
      materials: "비커, 시계접시, 얼음(또는 찬물), 삼발이, 아이오딘과 모래 혼합물",
      result: "차가운 시계접시에는 아이오딘, 비커 바닥에는 모래가 남습니다.",
      substances: ["iodine", "sand"],
      steps: [
        { title: "혼합물 넣기", action: "비커에 아이오딘과 모래 혼합물을 넣습니다.", see: "보라색 아이오딘과 모래가 바닥에 섞여 있습니다.", reason: "둘 다 고체라 거름으로는 나누기 어렵습니다." },
        { title: "시계접시로 덮기", action: "비커 위를 시계접시로 덮고, 접시 위에 얼음을 올립니다.", see: "위는 차갑고 아래는 나중에 뜨거워질 장치입니다.", reason: "기체가 차가운 면에서 다시 고체가 되게 하려고 온도 차이를 만듭니다." },
        { title: "아래만 가열", action: "비커 바닥을 약하게 가열합니다. 뚜껑을 열지 않습니다.", see: "아이오딘이 녹지 않고 바로 보라색 기체가 되기 시작합니다. 모래는 그대로입니다.", reason: "승화는 고체→기체입니다. 아이오딘만 이 성질이 뚜렷합니다." },
        { title: "증기가 올라감", action: "기체가 위쪽으로 모이는지 봅니다. 냄새를 들이마시지 않습니다.", see: "보라색 증기가 비커를 채우며 시계접시 쪽으로 올라갑니다.", reason: "기체는 위로 퍼지고, 모래 알갱이는 무거워 바닥에 남습니다." },
        { title: "차가운 면에 붙음", action: "가열을 멈추고 조금 식힙니다.", see: "시계접시 안쪽에 아이오딘 고체가 다시 붙습니다.", reason: "기체→고체로 돌아가는 것도 승화(또는 증착)입니다. 온도가 낮아 다시 고체 자리가 안정됩니다." },
        { title: "분리 완료", action: "시계접시를 조심히 열어 위와 아래를 비교합니다.", see: "위=아이오딘, 아래=모래.", reason: "승화성 물질이 섞여 있을 때만 쓸 수 있는 방법입니다." }
      ]
    },
    {
      id: "complex", title: "철 + 모래 + 소금물",
      why: "성질이 여러 개면 한 번에 나누지 말고, 가장 쉬운 것부터 차례로 뺍니다.",
      materials: "자석, 깔때기·거름종이, 증발 접시, 철가루·모래·소금물",
      result: "철(자석) → 모래(거름) → 물(증발) → 소금(결정) 순서로 모두 나뉩니다.",
      substances: ["iron", "sand", "salt", "water"],
      steps: [
        { title: "무엇이 섞였는지", action: "철가루, 모래, 소금물을 한 접시에서 확인합니다.", see: "고체 두 가지와 용액이 함께 있습니다.", reason: "자성, 용해도, 입자 크기를 각각 다른 단계에서 씁니다." },
        { title: "1단계 자석", action: "자석으로 철가루만 먼저 떼어 냅니다.", see: "철이 빠져나가고 모래+소금물이 남습니다.", reason: "가장 빠르고 다른 물질을 건드리지 않는 방법부터 합니다." },
        { title: "2단계 거름 준비", action: "남은 모래+소금물을 거름장치에 옮길 준비를 합니다.", see: "철은 이미 없습니다. 이제 불용성 고체와 용액만 남았습니다.", reason: "소금은 물에 녹아 있어 거름종이로 안 걸러집니다." },
        { title: "모래 걸러 내기", action: "거름으로 모래를 종이에 남기고, 아래로는 소금물을 받습니다.", see: "거름=모래, 여액=소금물.", reason: "모래는 안 녹고 입자가 큽니다." },
        { title: "3단계 증발", action: "여액(소금물)을 증발 접시에 담아 가열합니다.", see: "물이 수증기로 달아납니다. 소금은 아직 용액 안에 있습니다.", reason: "물을 기체로 만들어야 녹아 있던 소금을 고체로 얻습니다." },
        { title: "소금 결정", action: "물이 거의 없어질 때까지 두고 결정을 확인합니다.", see: "하얀 소금이 남습니다.", reason: "용매가 사라지면 용질이 석출됩니다." },
        { title: "모두 분리", action: "철, 모래, 소금, (날아간) 물을 각각 떠올립니다.", see: "네 가지가 성질마다 다른 방법으로 나뉘었습니다.", reason: "복잡한 혼합물은 ‘한 방법’이 아니라 ‘순서’가 정답입니다." }
      ]
    }
  ];

  const QUIZ = [
    { q: "철가루와 모래를 가장 쉽게 나누는 성질은?", choices: ["끓는점", "자성", "색깔", "냄새"], a: 1, why: "철만 자석에 붙으므로 자성의 차이를 씁니다." },
    { q: "소금물에서 소금을 얻고 싶을 때 알맞은 방법은?", choices: ["자석", "체질", "증발", "분액깔때기"], a: 2, why: "물은 증발하고 녹아 있던 소금은 고체로 남습니다." },
    { q: "물과 식용유가 층으로 갈라지는 까닭은?", choices: ["서로 섞이지 않고 밀도가 다르다", "둘 다 자석에 붙는다", "입자 크기가 같다", "끓는점이 같다"], a: 0, why: "섞이지 않는 액체는 밀도 순으로 층을 이룹니다." },
    { q: "모래와 물을 나눌 때 거름종이를 쓰는 이유는?", choices: ["모래가 물에 잘 녹아서", "모래 입자가 종이 구멍보다 커서", "물의 끓는점이 낮아서", "모래가 자석에 붙어서"], a: 1, why: "녹지 않는 고체는 거름종이에서 걸러집니다." },
    { q: "물과 에탄올을 증류로 나누는 핵심 성질은?", choices: ["자성", "입자 크기", "끓는점", "승화성"], a: 2, why: "에탄올이 더 낮은 온도에서 먼저 끓습니다." },
    { q: "사인펜 점을 물에 담그면 색이 갈라지는 실험의 이름은?", choices: ["여과", "크로마토그래피", "원심 분리", "승화"], a: 1, why: "색소의 흡착력 차이로 이동 거리가 달라집니다." }
  ];

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => [...document.querySelectorAll(sel)];

  let selected = new Set();
  let currentPreset = PRESETS[0];
  let sim = null;
  let quizIndex = 0;
  let quizScore = 0;
  let quizLocked = false;

  function showTab(id, updateHash) {
    $$(".tab").forEach((t) => {
      const on = t.dataset.tab === id;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    $$(".panel").forEach((p) => {
      const on = p.id === id;
      p.classList.toggle("is-active", on);
      p.hidden = !on;
    });
    if (id === "lab" && !sim) startLab(currentPreset.id, false);
    if (updateHash !== false) {
      const next = "#" + id;
      if (location.hash !== next) history.replaceState(null, "", next);
    }
  }

  function renderMethods() {
    $("#method-cards").innerHTML = METHODS.map((m) => `
      <article class="method-card" data-goto-lab="${m.id}">
        <div class="method-icon" style="background:${m.color}22">${m.icon}</div>
        <h3>${m.name}</h3>
        <p>${m.why}<br>예: ${m.example}</p>
        <span class="prop-tag">${m.prop}</span>
      </article>
    `).join("");
    $$(".method-card").forEach((card) => {
      card.addEventListener("click", () => {
        const id = card.dataset.gotoLab;
        currentPreset = PRESETS.find((p) => p.id === id) || PRESETS[0];
        showTab("lab");
      });
    });
  }

  function renderChips() {
    $("#substance-chips").innerHTML = Object.values(SUBSTANCES).map((s) => `
      <button class="chip" data-id="${s.id}" type="button">
        <span class="swatch" style="background:${s.color}"></span>${s.name}
      </button>
    `).join("");
    $$("#substance-chips .chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const id = chip.dataset.id;
        if (selected.has(id)) selected.delete(id);
        else selected.add(id);
        chip.classList.toggle("is-on", selected.has(id));
      });
    });
  }

  function planSeparation(ids) {
    const items = ids.map((id) => SUBSTANCES[id]).filter(Boolean);
    if (items.length < 2) {
      return { error: "물질을 2가지 이상 고르세요. 한 가지만 있으면 이미 순물질입니다." };
    }
    const steps = [];
    let pool = [...items];

    const take = (pred, method, detail) => {
      const hit = pool.filter(pred);
      const rest = pool.filter((x) => !pred(x));
      if (hit.length && rest.length) {
        steps.push({ method, detail, out: hit.map((x) => x.name).join(", "), left: rest.map((x) => x.name).join(", ") });
        pool = rest;
        return true;
      }
      return false;
    };

    take((s) => s.magnetic, "자석 분리", "자석에 붙는 물질을 먼저 떼어 냅니다. 가장 빠르고 도구도 단순합니다.");
    take((s) => s.sublimes, "승화", "가열하면 고체가 바로 기체가 되는 물질만 위로 모아 분리합니다.");
    take((s) => s.pigments, "크로마토그래피", "색소는 종이와 용매를 따라 이동하는 속도가 달라 띠로 갈라집니다.");

    const liquids = pool.filter((s) => s.state === "liquid" || s.state === "solution");
    const coarse = pool.filter((s) => s.size === "coarse");
    const finer = pool.filter((s) => s.state === "solid" && s.size && s.size !== "coarse");
    if (coarse.length && finer.length && liquids.length === 0) {
      steps.push({
        method: "체질",
        detail: "자갈처럼 큰 알갱이는 체에 남고, 모래처럼 작은 알갱이는 아래로 빠집니다.",
        out: coarse.map((s) => s.name).join(", "),
        left: finer.map((s) => s.name).join(", ")
      });
      pool = pool.filter((s) => s.size !== "coarse");
    }

    const water = pool.find((s) => s.id === "water");
    const insolubles = pool.filter((s) => s.state === "solid" && !s.soluble);
    const solubles = pool.filter((s) => s.state === "solid" && s.soluble);
    if (water && insolubles.length) {
      steps.push({ method: "거름(여과)", detail: "물에 녹지 않는 고체는 거름종이에 걸립니다. 녹은 물질은 물과 함께 아래로 갑니다.", out: insolubles.map((s) => s.name).join(", "), left: pool.filter((s) => !insolubles.includes(s)).map((s) => s.name).join(", ") });
      pool = pool.filter((s) => !insolubles.includes(s));
    }

    const oilLike = pool.filter((s) => s.state === "liquid" && !s.miscibleWater && s.id !== "water");
    const waterLike = pool.filter((s) => s.id === "water" || (s.state === "liquid" && s.miscibleWater));
    if (oilLike.length && waterLike.length) {
      steps.push({ method: "분액깔때기", detail: "서로 안 섞이는 액체는 밀도 순으로 층을 이룹니다. 아래층부터 꼭지로 받습니다.", out: oilLike.map((s) => s.name).join(", "), left: waterLike.map((s) => s.name).join(", ") });
      pool = pool.filter((s) => !oilLike.includes(s));
    }

    const mixLiquids = pool.filter((s) => s.state === "liquid");
    if (mixLiquids.length >= 2) {
      const sorted = [...mixLiquids].sort((a, b) => a.bp - b.bp);
      steps.push({ method: "증류", detail: `${sorted[0].name}의 끓는점(${sorted[0].bp}℃)이 더 낮아 먼저 기체가 되었다가 냉각되어 모입니다.`, out: sorted[0].name, left: sorted.slice(1).map((s) => s.name).join(", ") });
      pool = pool.filter((s) => s.id !== sorted[0].id);
    }

    if (pool.some((s) => s.soluble) && pool.some((s) => s.id === "water")) {
      const salts = pool.filter((s) => s.soluble);
      steps.push({ method: "증발·결정화", detail: "물을 날리면 녹아 있던 고체가 결정으로 남습니다.", out: salts.map((s) => s.name).join(", "), left: "수증기(물)" });
      pool = pool.filter((s) => !s.soluble && s.id !== "water");
    }

    if (!steps.length) {
      return { error: "이 조합은 성질이 너무 비슷합니다. 다른 물질을 섞거나, 실험하기 탭의 기본 혼합물을 먼저 살펴보세요." };
    }
    return { steps, names: items.map((s) => s.name).join(" + ") };
  }

  function renderPlan() {
    const board = $("#plan-board");
    const plan = planSeparation([...selected]);
    if (plan.error) {
      board.innerHTML = `<p class="empty-hint">${plan.error}</p>`;
      return;
    }
    const simId = matchPreset([...selected]);
    board.innerHTML = `
      <h3>${plan.names}</h3>
      <p class="plan-meta">쉬운 성질부터 순서대로 나눕니다. 한 번에 모든 것을 나누려 하지 마세요.</p>
      <ol class="plan-steps">
        ${plan.steps.map((s, i) => `
          <li>
            <span class="step-num">${i + 1}</span>
            <div>
              <h4>${s.method}</h4>
              <p>${s.detail}<br>분리: ${s.out} · 남은 것: ${s.left}</p>
            </div>
          </li>
        `).join("")}
      </ol>
      ${simId ? `<button class="btn primary try-lab" data-goto="lab" data-preset="${simId}">이 실험 시뮬레이션 보기</button>` : ""}
    `;
    const btn = board.querySelector("[data-preset]");
    if (btn) {
      btn.addEventListener("click", () => {
        currentPreset = PRESETS.find((p) => p.id === btn.dataset.preset) || currentPreset;
        showTab("lab");
      });
    }
  }

  function matchPreset(ids) {
    const set = new Set(ids);
    const exact = PRESETS.find((p) => p.substances.length === set.size && p.substances.every((s) => set.has(s)));
    if (exact) return exact.id;
    return set.has("ink") && ids.length <= 2 ? "chroma" : null;
  }

  function renderPresets() {
    $("#preset-list").innerHTML = PRESETS.map((p) => `
      <button class="preset-btn ${p.id === currentPreset.id ? "is-on" : ""}" data-id="${p.id}">
        ${p.title}
        <small>${p.why}</small>
      </button>
    `).join("");
    $$(".preset-btn").forEach((btn) => {
      btn.addEventListener("click", () => startLab(btn.dataset.id, true));
    });
  }

  function renderStepUI(stepIndex) {
    const steps = currentPreset.steps;
    const s = steps[stepIndex];
    $("#caption-index").textContent = `${stepIndex + 1} / ${steps.length}`;
    $("#caption-title").textContent = s.title;
    $("#caption-action").textContent = s.action;
    $("#detail-action").textContent = s.action;
    $("#detail-see").textContent = s.see;
    $("#detail-reason").textContent = s.reason;
    const last = stepIndex >= steps.length - 1;
    $("#lab-result").hidden = !last;
    $("#lab-result").textContent = last ? "결과 · " + currentPreset.result : "";
    $("#lab-steps").innerHTML = steps.map((st, i) => `
      <li class="${i === stepIndex ? "is-now" : ""} ${i < stepIndex ? "is-done" : ""}" data-step="${i}">
        <span class="n">${i + 1}</span>
        <div><strong>${st.title}</strong>${st.action}</div>
      </li>
    `).join("");
    $$("#lab-steps li").forEach((li) => {
      li.addEventListener("click", () => sim?.goto(Number(li.dataset.step)));
    });
  }

  function startLab(id, autoplay) {
    currentPreset = PRESETS.find((p) => p.id === id) || PRESETS[0];
    $("#lab-title").textContent = currentPreset.title;
    $("#lab-why").textContent = currentPreset.why;
    $("#lab-materials").innerHTML = `<b>준비물</b> · ${currentPreset.materials}`;
    renderPresets();
    renderStepUI(0);
    if (sim) sim.stop();
    sim = createSim(currentPreset.id);
    sim.reset();
    if (autoplay) sim.play();
    $("#sim-play").textContent = autoplay ? "일시정지" : "실험 시작";
  }

  function createSim(kind) {
    const canvas = $("#lab-canvas");
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    let running = false;
    let raf = 0;
    let particles = [];
    let stepIndex = 0;
    let stepT = 0;
    const STEP_FRAMES = 300;

    const rand = (a, b) => a + Math.random() * (b - a);
    const lerp = (a, b, t) => a + (b - a) * t;
    const clamp01 = (x) => Math.max(0, Math.min(1, x));
    const ease = (t) => t * t * (3 - 2 * t);

    const loop = () => {
      stepT += 1;
      if (stepT >= STEP_FRAMES && stepIndex < currentPreset.steps.length - 1) {
        goto(stepIndex + 1, false);
      } else if (stepT >= STEP_FRAMES && stepIndex >= currentPreset.steps.length - 1) {
        running = false;
        $("#sim-play").textContent = "다시 보기";
      }
      draw();
      if (running) raf = requestAnimationFrame(loop);
    };

    function goto(i, stopAuto) {
      stepIndex = Math.max(0, Math.min(i, currentPreset.steps.length - 1));
      stepT = 0;
      renderStepUI(stepIndex);
      if (stopAuto) {
        running = true;
        cancelAnimationFrame(raf);
        $("#sim-play").textContent = "일시정지";
        const playOne = () => {
          stepT += 1;
          draw();
          if (stepT < STEP_FRAMES * 0.92 && running) {
            raf = requestAnimationFrame(playOne);
          } else {
            running = false;
            $("#sim-play").textContent = stepIndex >= currentPreset.steps.length - 1 ? "다시 보기" : "이어서";
          }
        };
        raf = requestAnimationFrame(playOne);
      }
    }

    function spawnMix() {
      particles = [];
      const add = (n, type, color, r, box) => {
        const [x1, y1, x2, y2] = box;
        for (let i = 0; i < n; i++) {
          const x = rand(x1, x2);
          const y = rand(y1, y2);
          particles.push({
            type, color, r: r + rand(-1, 1),
            x, y, hx: x, hy: y, vx: 0, vy: 0,
            band: 0, off: rand(-18, 18), off2: rand(-12, 12)
          });
        }
      };
      if (kind === "magnet") { add(64, "iron", "#9aa3ad", 4.2, [280, 200, 680, 370]); add(64, "sand", "#c4a574", 4.6, [280, 200, 680, 370]); }
      if (kind === "filter") { add(36, "sand", "#c4a574", 5, [150, 90, 270, 180]); add(80, "water", "#38bdf8", 3.2, [150, 90, 270, 180]); }
      if (kind === "evaporate") { add(46, "salt", "#f8fafc", 3.2, [380, 320, 580, 355]); add(86, "water", "#38bdf8", 3.4, [370, 305, 590, 350]); }
      if (kind === "distill") { add(48, "ethanol", "#86efac", 3.2, [300, 300, 420, 420]); add(48, "water", "#38bdf8", 3.2, [300, 300, 420, 420]); }
      if (kind === "funnel") { add(64, "oil", "#f4d03f", 3.6, [440, 170, 520, 330]); add(64, "water", "#38bdf8", 3.6, [440, 170, 520, 330]); }
      if (kind === "chroma") {
        ["#8b5cf6", "#fb7185", "#38bdf8"].forEach((c, i) => {
          for (let k = 0; k < 16; k++) {
            particles.push({ type: "dye", color: c, r: 2.5, x: 480 + rand(-7, 7), y: 400, hx: 480, hy: 400, band: i, off: rand(-6, 6), off2: 0 });
          }
        });
      }
      if (kind === "sieve") { add(42, "sand", "#c4a574", 3.4, [340, 150, 620, 210]); add(24, "gravel", "#7a7468", 9, [340, 150, 620, 210]); }
      if (kind === "sublime") { add(36, "iodine", "#7e22ce", 4, [400, 310, 560, 370]); add(46, "sand", "#c4a574", 4.5, [400, 330, 560, 380]); }
      if (kind === "complex") { add(30, "iron", "#9aa3ad", 4, [300, 190, 660, 350]); add(30, "sand", "#c4a574", 4.4, [300, 190, 660, 350]); add(30, "salt", "#f8fafc", 3, [300, 190, 660, 350]); add(44, "water", "#38bdf8", 3.1, [300, 190, 660, 350]); }
    }

    function moveToward(p, tx, ty, k) {
      p.x += (tx - p.x) * k;
      p.y += (ty - p.y) * k;
    }

    function glass(x, y, w, h) {
      ctx.strokeStyle = "rgba(186, 230, 253, .7)";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, w, h);
    }

    function label(text, x, y, color) {
      ctx.fillStyle = color || "rgba(243,236,227,.9)";
      ctx.font = "600 14px Pretendard, sans-serif";
      ctx.fillText(text, x, y);
    }

    function drawParticles() {
      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.type === "water" || p.type === "ethanol" || p.type === "oil" ? 0.78 : 0.95;
        ctx.arc(p.x, p.y, Math.max(0.4, p.r), 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    function flame(x, y, n) {
      ctx.fillStyle = "#e07840";
      for (let i = 0; i < n; i++) {
        const fx = x + i * 16;
        const h = 16 + (stepT % 14);
        ctx.beginPath();
        ctx.moveTo(fx, y);
        ctx.quadraticCurveTo(fx + 4, y - h, fx + 8, y);
        ctx.fill();
      }
    }

    function u() { return ease(clamp01(stepT / (STEP_FRAMES * 0.85))); }

    function updateMagnet() {
      const s = stepIndex;
      const magX = s < 2 ? 910 : s === 2 ? lerp(910, 760, u()) : 760;
      const magY = s < 4 ? 240 : s === 4 ? lerp(240, 150, u()) : 145;
      for (const p of particles) {
        if (s === 1) moveToward(p, lerp(p.hx, 280 + (p.hx - 280) * 1.08, u()), lerp(p.hy, 360, u() * 0.35 + 0.1), 0.08);
        if (p.type === "iron" && s >= 3) {
          moveToward(p, magX + 20 + p.off * 0.6, magY + p.off2 * 0.7, s === 3 ? 0.05 : 0.12);
        } else if (p.type === "sand") {
          moveToward(p, p.hx, 375 + Math.abs(p.off) * 0.15, 0.06);
        } else if (s < 3) {
          p.x += Math.sin(stepT * 0.04 + p.off) * 0.15;
          p.y += Math.cos(stepT * 0.03 + p.off2) * 0.12;
        }
      }
      ctx.fillStyle = "#2a241e";
      ctx.fillRect(240, 160, 500, 240);
      ctx.fillStyle = "#3a322a";
      ctx.fillRect(240, 390, 500, 22);
      drawParticles();
      ctx.fillStyle = "#e11d48";
      ctx.fillRect(magX - 20, magY - 50, 80, 90);
      ctx.fillStyle = "#2563eb";
      ctx.fillRect(magX - 20, magY + 40, 80, 34);
      label("막대자석  N", magX - 18, magY - 62);
      label("S", magX + 12, magY + 62);
      if (s >= 1) label("접시에 펼친 혼합물", 250, 150);
      if (s >= 3) label("철가루 → 자석", magX - 30, magY - 78, "#fbbf24");
      if (s >= 4) label("모래만 남음", 250, 430, "#c4a574");
    }

    function updateFilter() {
      const s = stepIndex;
      for (const p of particles) {
        if (s <= 1) moveToward(p, p.hx, p.hy, 0.08);
        else if (s === 2) moveToward(p, lerp(p.hx, 500 + p.off * 0.4, u()), lerp(p.hy, 230, u()), 0.07);
        else if (p.type === "sand") moveToward(p, 500 + p.off * 0.5, 262, 0.08);
        else if (s === 3) moveToward(p, 500 + p.off * 0.3, lerp(250, 430, u()), 0.06);
        else moveToward(p, 500 + p.off * 0.4, 430 + Math.abs(p.off2) * 0.4, 0.08);
      }
      glass(140, 70, 150, 130);
      label("비커 (혼합물)", 140, 60);
      ctx.strokeStyle = "rgba(186,230,253,.75)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(430, 200); ctx.lineTo(480, 275); ctx.lineTo(520, 275); ctx.lineTo(570, 200);
      ctx.stroke();
      if (s >= 0) {
        ctx.fillStyle = s === 0 ? `rgba(251,191,36,${0.15 + u() * 0.25})` : "rgba(251,191,36,.35)";
        ctx.beginPath();
        ctx.moveTo(442, 210); ctx.lineTo(500, 270); ctx.lineTo(558, 210);
        ctx.fill();
        label("거름종이", 300, 220);
      }
      glass(410, 300, 180, 170);
      label("삼각 플라스크", 410, 490);
      drawParticles();
      if (s >= 3) { label("모래 = 거름 (통과 못 함)", 250, 255, "#c4a574"); label("물 = 여액 (구멍 통과)", 620, 400, "#38bdf8"); }
    }

    function updateEvaporate() {
      const s = stepIndex;
      const boil = s >= 2;
      for (const p of particles) {
        if (p.type === "water") {
          if (s <= 1) moveToward(p, p.hx, p.hy + (s === 1 ? Math.sin(stepT * 0.1 + p.off) * 2 : 0), 0.08);
          else {
            p.y -= (s >= 3 ? 0.9 : 0.45);
            p.x += Math.sin(stepT * 0.04 + p.off) * 0.45;
            if (p.y < 70) {
              p.y = 330;
              p.x = p.hx;
              if (s >= 4) p.r = Math.max(0.2, p.r - 0.35);
              if (s >= 5) p.r = 0.2;
            }
          }
        } else {
          const ty = s >= 4 ? 348 : 338;
          const spread = s >= 4 ? 1.15 : 1;
          moveToward(p, 480 + (p.hx - 480) * spread, ty, 0.05);
          if (s >= 4) p.r = Math.min(5.2, 3.2 + (s - 3) * 0.6);
        }
      }
      ctx.fillStyle = "#1c1612";
      ctx.beginPath();
      ctx.ellipse(480, 360, 130, 28, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(186,230,253,.7)";
      ctx.stroke();
      if (s >= 1) flame(430, 412, 7);
      drawParticles();
      label("증발 접시", 200, 365);
      if (s >= 2) label("수증기 (물, 100℃)", 200, 110, "#7dd3fc");
      if (s <= 2) label("소금은 녹아 있어 안 보임", 620, 300);
      if (s >= 4) label("소금 결정 석출", 640, 370, "#f8fafc");
      if (boil) label(s >= 3 ? "물이 줄며 농축" : "가열 중", 200, 250, "#fbbf24");
    }

    function updateDistill() {
      const s = stepIndex;
      const temp = s <= 1 ? lerp(25, 60, u()) : s === 2 ? lerp(60, 78, u()) : s >= 5 ? 98 : 78;
      for (const p of particles) {
        if (p.type === "ethanol") {
          if (s <= 1) moveToward(p, 360 + p.off * 0.8, 340 + p.off2, 0.06);
          else if (s === 2) moveToward(p, 360 + p.off * 0.3, lerp(340, 210, u()), 0.05);
          else if (s === 3) moveToward(p, lerp(360, 760, u()), 210 + Math.sin(p.off) * 6, 0.05);
          else moveToward(p, 760 + p.off * 0.25, 420 + p.off2 * 0.3, 0.07);
        } else {
          moveToward(p, 360 + Math.sin(stepT * 0.03 + p.off) * (s >= 1 ? 28 : 10), 340 + Math.abs(Math.sin(stepT * 0.02 + p.hx)) * 50, 0.08);
        }
      }
      ctx.strokeStyle = "rgba(186,230,253,.75)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(360, 360, 90, 110, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(360, 250); ctx.lineTo(360, 210); ctx.lineTo(760, 210); ctx.lineTo(760, 300);
      ctx.stroke();
      ctx.strokeRect(710, 300, 100, 150);
      if (s >= 1) flame(330, 478, 5);
      drawParticles();
      label("증류 플라스크", 200, 360);
      label("냉각기 (응축)", 500, 188);
      label("받는 플라스크", 630, 290);
      label(`온도계 ≈ ${temp.toFixed(0)}℃`, 200, 240, "#fbbf24");
      if (s >= 2) label("에탄올 78℃에서 먼저 끓음", 200, 140, "#86efac");
      if (s >= 4) label("증류액 = 에탄올", 630, 470, "#86efac");
      if (s >= 5) label("남은 액체 ≈ 물", 200, 490, "#38bdf8");
    }

    function updateFunnel() {
      const s = stepIndex;
      const open = s >= 3;
      for (const p of particles) {
        if (s === 0) moveToward(p, 480 + p.off * 0.9, 250 + p.off2 * 1.2, 0.08);
        else if (s <= 2) {
          const ty = p.type === "oil" ? 210 : 310;
          moveToward(p, 480 + p.off * 0.55, ty + p.off2 * 0.4, 0.05);
        } else if (p.type === "water" && s === 3) moveToward(p, 480 + p.off * 0.2, lerp(320, 455, u()), 0.06);
        else if (p.type === "water") moveToward(p, 480 + p.off * 0.35, 450, 0.08);
        else if (s >= 4) moveToward(p, 700 + p.off * 0.4, 250 + p.off2 * 0.3, 0.05);
        else moveToward(p, 480 + p.off * 0.5, 210, 0.05);
      }
      ctx.strokeStyle = "rgba(186,230,253,.75)";
      ctx.beginPath();
      ctx.moveTo(400, 110); ctx.lineTo(430, 190); ctx.lineTo(430, 355); ctx.lineTo(530, 355); ctx.lineTo(530, 190); ctx.lineTo(560, 110);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(480, 355); ctx.lineTo(480, 400);
      ctx.stroke();
      ctx.fillStyle = open && s === 3 ? "#2dd4bf" : "#e07840";
      ctx.fillRect(468, 396, 24, 10);
      glass(410, 410, 140, 80);
      if (s >= 4) glass(650, 210, 120, 90);
      drawParticles();
      label("분액깔때기", 200, 120);
      label(open && s === 3 ? "꼭지 열림 → 아래층" : "꼭지 닫힘", 560, 408);
      if (s >= 2) { label("위층 기름 (밀도 0.91)", 200, 210, "#f4d03f"); label("아래층 물 (밀도 1.0)", 200, 320, "#38bdf8"); }
      if (s >= 4) label("기름 따로", 650, 200, "#f4d03f");
    }

    function updateChroma() {
      const s = stepIndex;
      const front = s <= 1 ? 430 : s === 2 ? lerp(430, 280, u()) : s === 3 ? lerp(280, 200, u()) : 140;
      ctx.fillStyle = "rgba(56,189,248,.1)";
      ctx.fillRect(320, 70, 320, 400);
      ctx.strokeStyle = "rgba(186,230,253,.5)";
      ctx.strokeRect(320, 70, 320, 400);
      ctx.fillStyle = "#f3ece3";
      ctx.fillRect(455, 90, 50, 360);
      ctx.fillStyle = "rgba(56,189,248,.32)";
      const wetTop = Math.max(front, 90);
      ctx.fillRect(320, wetTop, 320, 470 - wetTop);
      ctx.strokeStyle = "#e07840";
      ctx.beginPath();
      ctx.moveTo(455, 400); ctx.lineTo(505, 400);
      ctx.stroke();
      for (const p of particles) {
        if (s === 0) moveToward(p, 480 + p.off * 0.3, 400, 0.1);
        else {
          const dest = [400, 310, 220][p.band];
          const startMove = s < 3 ? 400 : s === 3 ? lerp(400, dest, u()) : dest;
          p.y += (startMove - p.y) * 0.06;
          p.x = 480 + Math.sin(stepT * 0.03 + p.band) * (4 + p.band * 3) + p.off * 0.2;
        }
      }
      drawParticles();
      label("출발선 (점은 용매에 잠기지 않게)", 150, 404);
      label("용매 앞면", 200, front);
      if (s >= 4) { label("흡착 강함 → 조금 이동", 150, 400, "#8b5cf6"); label("흡착 약함 → 멀리 이동", 150, 220, "#38bdf8"); }
      label("거름종이", 520, 80);
    }

    function updateSieve() {
      const s = stepIndex;
      const shake = s === 2 || s === 3 ? Math.sin(stepT * 0.35) * 10 : 0;
      for (const p of particles) {
        if (s <= 1) moveToward(p, p.hx, 200, 0.08);
        else if (p.type === "sand") moveToward(p, p.hx + shake * 0.3, s >= 4 ? 450 : lerp(200, 450, s === 3 ? u() : 0.35), 0.07);
        else moveToward(p, p.hx + shake * 0.4, 248, 0.08);
      }
      ctx.strokeStyle = "rgba(243,236,227,.55)";
      ctx.strokeRect(280 + shake * 0.2, 230, 400, 20);
      for (let i = 0; i < 16; i++) {
        ctx.beginPath();
        ctx.moveTo(300 + i * 24 + shake * 0.2, 230);
        ctx.lineTo(300 + i * 24 + shake * 0.2, 250);
        ctx.stroke();
      }
      ctx.strokeRect(320, 400, 320, 80);
      drawParticles();
      label("체 (구멍: 모래 < 구멍 < 자갈)", 200, 220);
      if (s >= 3) label("모래 통과", 200, 450, "#c4a574");
      if (s >= 4) label("자갈은 구멍보다 큼", 200, 270, "#d6d3d1");
    }

    function updateSublime() {
      const s = stepIndex;
      for (const p of particles) {
        if (p.type === "iodine") {
          if (s <= 1) moveToward(p, p.hx, p.hy, 0.08);
          else if (s === 2) moveToward(p, p.hx + p.off * 0.2, lerp(p.hy, 220, u()), 0.05);
          else if (s === 3) moveToward(p, 480 + p.off * 1.4, lerp(220, 160, u()), 0.05);
          else moveToward(p, 480 + p.off * 2.2, 148, 0.06);
        } else moveToward(p, p.hx, 365, 0.06);
      }
      glass(360, 140, 240, 250);
      ctx.beginPath();
      ctx.ellipse(480, 140, 128, 14, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(186,230,253,.85)";
      ctx.stroke();
      if (s >= 1) {
        ctx.fillStyle = "rgba(186,230,253,.25)";
        ctx.beginPath();
        ctx.ellipse(480, 128, 70, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        label("얼음 (냉각)", 200, 120, "#7dd3fc");
      }
      if (s >= 2) flame(420, 418, 6);
      drawParticles();
      label("시계접시", 200, 145);
      if (s >= 2) label("아이오딘 승화 고체→기체", 150, 230, "#c084fc");
      if (s >= 4) label("차가운 면에서 다시 고체", 150, 175, "#c084fc");
      label("모래는 그대로", 640, 380, "#c4a574");
    }

    function updateComplex() {
      const s = stepIndex;
      for (const p of particles) {
        if (p.type === "iron") {
          if (s <= 0) moveToward(p, p.hx, p.hy, 0.06);
          else moveToward(p, 800 + p.off * 0.3, 170 + p.off2 * 0.4, 0.06);
        } else if (p.type === "sand") {
          if (s <= 1) moveToward(p, p.hx, Math.min(p.hy + 40, 360), 0.05);
          else if (s === 2) moveToward(p, lerp(p.hx, 300, u()), lerp(360, 210, u()), 0.05);
          else moveToward(p, 280 + p.off * 0.4, 200, 0.07);
        } else if (p.type === "water") {
          if (s <= 3) moveToward(p, 500 + p.off * 0.4, 360, 0.05);
          else {
            p.y -= 0.7;
            if (p.y < 80) { p.y = 340; p.r = Math.max(0.2, p.r - 0.25); }
            if (s >= 6) p.r = 0.2;
          }
        } else {
          if (s <= 3) moveToward(p, 500 + p.off * 0.3, 350, 0.05);
          else moveToward(p, 500 + p.off * 0.8, 355, 0.05);
        }
      }
      ctx.fillStyle = "#1c1612";
      ctx.fillRect(260, 150, 430, 240);
      ctx.fillStyle = "#e11d48";
      ctx.fillRect(760, 140, 70, 90);
      ctx.fillStyle = "#2563eb";
      ctx.fillRect(760, 230, 70, 28);
      if (s >= 2) {
        ctx.strokeStyle = "rgba(186,230,253,.5)";
        ctx.beginPath();
        ctx.moveTo(230, 150); ctx.lineTo(270, 210); ctx.lineTo(310, 150);
        ctx.stroke();
      }
      if (s >= 4) flame(470, 420, 5);
      drawParticles();
      const captions = ["한 접시에 네 물질", "자석으로 철만 제거", "남은 것: 모래 + 소금물", "거름으로 모래 분리", "여액(소금물) 가열", "소금 결정", "철 / 모래 / 소금 / 물"];
      label(captions[s], 260, 130, "#fbbf24");
    }

    const drawers = { magnet: updateMagnet, filter: updateFilter, evaporate: updateEvaporate, distill: updateDistill, funnel: updateFunnel, chroma: updateChroma, sieve: updateSieve, sublime: updateSublime, complex: updateComplex };

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#100e0c";
      ctx.fillRect(0, 0, W, H);
      drawers[kind]();
    }

    return {
      reset() {
        running = false;
        cancelAnimationFrame(raf);
        stepIndex = 0;
        stepT = 0;
        spawnMix();
        renderStepUI(0);
        draw();
      },
      play() {
        if (running) {
          running = false;
          cancelAnimationFrame(raf);
          return false;
        }
        if (stepIndex >= currentPreset.steps.length - 1 && stepT >= STEP_FRAMES) {
          this.reset();
        }
        running = true;
        raf = requestAnimationFrame(loop);
        return true;
      },
      stop() {
        running = false;
        cancelAnimationFrame(raf);
      },
      next() { goto(stepIndex + 1, true); },
      prev() { goto(stepIndex - 1, true); },
      goto(i) { goto(i, true); },
      isRunning() { return running; }
    };
  }

  /*
  function createSimOld(kind) {
    const canvas = $("#lab-canvas");
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    let running = false;
    let t = 0;
    let raf = 0;
    let particles = [];

    const rand = (a, b) => a + Math.random() * (b - a);
    const loop = () => {
      t += 1;
      draw();
      if (running) raf = requestAnimationFrame(loop);
    };

    function spawnMix() {
      particles = [];
      const add = (n, type, color, r, box) => {
        const [x1, y1, x2, y2] = box;
        for (let i = 0; i < n; i++) {
          particles.push({
            type, color, r: r + rand(-1, 1),
            x: rand(x1, x2), y: rand(y1, y2),
            vx: rand(-0.4, 0.4), vy: rand(-0.4, 0.4),
            stuck: false, layer: 0, band: 0
          });
        }
      };
      if (kind === "magnet") { add(70, "iron", "#9aa3ad", 4.2, [260, 160, 700, 370]); add(70, "sand", "#c4a574", 4.6, [260, 160, 700, 370]); }
      if (kind === "filter") { add(40, "sand", "#c4a574", 5, [430, 70, 560, 150]); add(90, "water", "#38bdf8", 3.2, [430, 70, 560, 150]); }
      if (kind === "evaporate") { add(50, "salt", "#f8fafc", 3.2, [380, 320, 580, 360]); add(90, "water", "#38bdf8", 3.4, [370, 300, 590, 355]); }
      if (kind === "distill") { add(50, "ethanol", "#86efac", 3.2, [300, 300, 420, 420]); add(50, "water", "#38bdf8", 3.2, [300, 300, 420, 420]); }
      if (kind === "funnel") { add(70, "oil", "#f4d03f", 3.6, [440, 180, 520, 280]); add(70, "water", "#38bdf8", 3.6, [440, 220, 520, 340]); }
      if (kind === "chroma") {
        ["#8b5cf6", "#fb7185", "#38bdf8"].forEach((c, i) => {
          for (let k = 0; k < 18; k++) particles.push({ type: "dye", color: c, r: 2.4, x: 480 + rand(-8, 8), y: 430, vx: 0, vy: 0, band: i, stuck: false });
        });
      }
      if (kind === "sieve") { add(45, "sand", "#c4a574", 3.4, [320, 160, 640, 230]); add(28, "gravel", "#7a7468", 9, [320, 160, 640, 230]); }
      if (kind === "sublime") { add(40, "iodine", "#7e22ce", 4, [390, 300, 570, 370]); add(50, "sand", "#c4a574", 4.5, [390, 320, 570, 380]); }
      if (kind === "complex") { add(36, "iron", "#9aa3ad", 4, [280, 180, 680, 360]); add(36, "sand", "#c4a574", 4.4, [280, 180, 680, 360]); add(36, "salt", "#f8fafc", 3, [280, 180, 680, 360]); add(50, "water", "#38bdf8", 3.1, [280, 180, 680, 360]); }
    }

    function glass(x, y, w, h, color) {
      ctx.strokeStyle = color || "rgba(186, 230, 253, .7)";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, w, h);
    }

    function label(text, x, y) {
      ctx.fillStyle = "rgba(243,236,227,.85)";
      ctx.font = "600 14px Pretendard, sans-serif";
      ctx.fillText(text, x, y);
    }

    function drawParticles() {
      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.type === "water" || p.type === "ethanol" || p.type === "oil" ? 0.78 : 0.95;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    function updateMagnet() {
      const mx = 780, my = 210;
      const phase = Math.min(1, t / 220);
      setStep(phase < 0.15 ? 0 : phase < 0.45 ? 1 : phase < 0.8 ? 2 : 3);
      for (const p of particles) {
        if (p.type === "iron") {
          p.vx += (mx - p.x) * 0.004;
          p.vy += (my - p.y) * 0.004;
          p.vx *= 0.92; p.vy *= 0.92;
        } else {
          p.vy += 0.04;
          if (p.y > 390) { p.y = 390; p.vy *= -0.2; p.vx *= 0.8; }
        }
        p.x += p.vx; p.y += p.vy;
      }
      ctx.fillStyle = "#2a241e";
      ctx.fillRect(240, 140, 500, 270);
      ctx.fillStyle = "#3a322a";
      ctx.fillRect(240, 390, 500, 20);
      drawParticles();
      ctx.fillStyle = "#e11d48";
      ctx.fillRect(740, 160, 90, 110);
      ctx.fillStyle = "#2563eb";
      ctx.fillRect(740, 270, 90, 40);
      label("자석 N / S", 748, 150);
      label("철가루", 750, 220);
      label("모래", 260, 430);
    }

    function updateFilter() {
      const phase = Math.min(1, t / 280);
      setStep(phase < 0.2 ? 0 : phase < 0.5 ? 1 : phase < 0.8 ? 2 : 3);
      for (const p of particles) {
        if (!p.falling) {
          p.x += (520 - p.x) * 0.01;
          p.y += 1.15;
          if (p.y > 250) p.falling = true;
        } else if (p.type === "sand") {
          p.y += (268 - p.y) * 0.08;
          p.x += rand(-0.4, 0.4);
          if (p.y > 275) p.y = 275;
        } else {
          p.y += 1.6;
          if (p.y > 455) { p.y = rand(400, 450); p.x = rand(430, 570); p.vx = 0; }
        }
      }
      ctx.strokeStyle = "rgba(186,230,253,.7)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(430, 210); ctx.lineTo(480, 280); ctx.lineTo(520, 280); ctx.lineTo(570, 210);
      ctx.stroke();
      ctx.fillStyle = "rgba(251, 191, 36, .25)";
      ctx.beginPath();
      ctx.moveTo(445, 220); ctx.lineTo(500, 275); ctx.lineTo(555, 220);
      ctx.fill();
      glass(410, 300, 180, 170);
      drawParticles();
      label("거름종이", 300, 230);
      label("모래(거름)", 300, 270);
      label("물(여액)", 620, 430);
    }

    function updateEvaporate() {
      const phase = Math.min(1, t / 320);
      setStep(phase < 0.2 ? 0 : phase < 0.5 ? 1 : phase < 0.8 ? 2 : 3);
      for (const p of particles) {
        if (p.type === "water") {
          p.y -= 0.7 + Math.sin(t * 0.05 + p.x) * 0.2;
          p.x += Math.sin(t * 0.03 + p.y) * 0.4;
          if (p.y < 80) { p.y = 330; p.x = rand(380, 580); }
          if (phase > 0.7) p.r = Math.max(0.4, p.r - 0.012);
        } else {
          p.y += (350 - p.y) * 0.02;
          p.x += Math.sin(t * 0.02 + p.y) * 0.15;
        }
      }
      ctx.fillStyle = "#1c1612";
      ctx.beginPath();
      ctx.ellipse(480, 360, 130, 28, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(186,230,253,.7)";
      ctx.stroke();
      ctx.fillStyle = "#e07840";
      for (let i = 0; i < 7; i++) {
        const fx = 430 + i * 16;
        ctx.beginPath();
        ctx.moveTo(fx, 410);
        ctx.quadraticCurveTo(fx + 4, 380 - (t % 16), fx + 8, 410);
        ctx.fill();
      }
      drawParticles();
      label("증발 접시", 200, 360);
      label("수증기", 200, 120);
      label("소금 결정", 640, 370);
    }

    function updateDistill() {
      const phase = Math.min(1, t / 340);
      setStep(phase < 0.2 ? 0 : phase < 0.45 ? 1 : phase < 0.75 ? 2 : 3);
      for (const p of particles) {
        if (p.type === "ethanol" && phase > 0.2) {
          if (p.y > 210 && p.x < 520) { p.y -= 1.1; p.x += 0.15; }
          else if (p.x < 760) { p.x += 1.7; p.y += Math.sin(p.x / 30) * 0.2; }
          else { p.y += 1.2; if (p.y > 430) p.y = 430; }
        } else {
          p.x = 360 + Math.sin(t * 0.03 + p.y) * 40;
          p.y = 300 + Math.abs(Math.sin(t * 0.02 + p.x)) * 80;
        }
      }
      ctx.strokeStyle = "rgba(186,230,253,.75)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(360, 360, 90, 110, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(360, 250); ctx.lineTo(360, 210); ctx.lineTo(760, 210); ctx.lineTo(760, 300);
      ctx.stroke();
      ctx.strokeRect(710, 300, 100, 150);
      ctx.fillStyle = "#e07840";
      for (let i = 0; i < 5; i++) {
        ctx.fillRect(330 + i * 14, 470, 8, 18 + (t % 10));
      }
      drawParticles();
      label("가열 플라스크", 200, 360);
      label("냉각기", 520, 190);
      label("증류액(에탄올)", 640, 290);
      label(`온도 ≈ ${Math.min(78, 25 + t / 4).toFixed(0)}℃`, 200, 250);
    }

    function updateFunnel() {
      const phase = Math.min(1, t / 300);
      setStep(phase < 0.2 ? 0 : phase < 0.45 ? 1 : phase < 0.75 ? 2 : 3);
      const open = phase > 0.5;
      for (const p of particles) {
        if (!open) {
          const targetY = p.type === "oil" ? 230 : 310;
          p.y += (targetY + rand(-18, 18) - p.y) * 0.04;
          p.x += (480 + rand(-40, 40) - p.x) * 0.04;
        } else if (p.type === "water") {
          if (p.y < 380) p.y += 1.5;
          else { p.x += (480 - p.x) * 0.05; p.y += 1.4; if (p.y > 470) p.y = rand(420, 470); }
        } else {
          p.y += (220 - p.y) * 0.03;
        }
      }
      ctx.strokeStyle = "rgba(186,230,253,.75)";
      ctx.beginPath();
      ctx.moveTo(400, 120); ctx.lineTo(430, 200); ctx.lineTo(430, 360); ctx.lineTo(530, 360); ctx.lineTo(530, 200); ctx.lineTo(560, 120);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(480, 360); ctx.lineTo(480, 400);
      ctx.stroke();
      ctx.fillStyle = open ? "#2dd4bf" : "#e07840";
      ctx.fillRect(468, 396, 24, 10);
      glass(410, 410, 140, 80);
      drawParticles();
      label("기름(위층)", 200, 220);
      label("물(아래층)", 200, 320);
      label(open ? "꼭지 열림" : "꼭지 닫힘", 560, 404);
    }

    function updateChroma() {
      const phase = Math.min(1, t / 360);
      setStep(phase < 0.15 ? 0 : phase < 0.4 ? 1 : phase < 0.75 ? 2 : 3);
      const front = 430 - phase * 280;
      ctx.fillStyle = "rgba(56,189,248,.12)";
      ctx.fillRect(300, 80, 360, 400);
      ctx.strokeStyle = "rgba(186,230,253,.5)";
      ctx.strokeRect(300, 80, 360, 400);
      ctx.fillStyle = "#f3ece3";
      ctx.fillRect(455, 100, 50, 360);
      ctx.fillStyle = "rgba(56,189,248,.35)";
      ctx.fillRect(300, Math.max(front, 100), 360, 400 - (Math.max(front, 100) - 80));
      for (const p of particles) {
        const speed = 0.55 + p.band * 0.28;
        p.y = Math.max(120 + p.band * 55, 430 - t * speed * 0.35);
        p.x = 480 + Math.sin(t * 0.02 + p.band) * (8 + p.band * 4);
      }
      drawParticles();
      label("용매 앞면", 200, front);
      label("종이", 520, 90);
      label("색소 띠", 200, 180);
    }

    function updateSieve() {
      const phase = Math.min(1, t / 240);
      setStep(phase < 0.2 ? 0 : phase < 0.45 ? 1 : phase < 0.75 ? 2 : 3);
      const shake = Math.sin(t * 0.35) * 8;
      for (const p of particles) {
        if (p.type === "sand") {
          p.y += 1.3;
          p.x += Math.sin(t * 0.2 + p.y) * 0.6;
          if (p.y > 450) p.y = 450;
        } else {
          p.y = 250 + Math.sin(t * 0.2 + p.x) * 6;
          p.x += Math.sin(t * 0.15) * 0.3;
          if (p.x < 300) p.x = 300;
          if (p.x > 660) p.x = 660;
        }
      }
      ctx.strokeStyle = "rgba(243,236,227,.5)";
      ctx.strokeRect(280 + shake * 0.2, 220, 400, 18);
      for (let i = 0; i < 18; i++) {
        ctx.beginPath();
        ctx.moveTo(290 + i * 22 + shake * 0.2, 220);
        ctx.lineTo(290 + i * 22 + shake * 0.2, 238);
        ctx.stroke();
      }
      ctx.strokeRect(300, 390, 360, 80);
      drawParticles();
      label("체", 200, 230);
      label("자갈", 200, 270);
      label("모래", 200, 430);
    }

    function updateSublime() {
      const phase = Math.min(1, t / 300);
      setStep(phase < 0.2 ? 0 : phase < 0.45 ? 1 : phase < 0.75 ? 2 : 3);
      for (const p of particles) {
        if (p.type === "iodine") {
          if (phase < 0.55) {
            p.y -= 0.9;
            p.x += Math.sin(t * 0.05 + p.y) * 0.5;
          } else {
            p.y += (150 - p.y) * 0.04;
            p.x += (480 + Math.sin(p.y) * 60 - p.x) * 0.03;
          }
        } else {
          p.y += (360 - p.y) * 0.02;
        }
      }
      glass(360, 140, 240, 250);
      ctx.beginPath();
      ctx.ellipse(480, 140, 130, 14, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(186,230,253,.8)";
      ctx.stroke();
      ctx.fillStyle = "#e07840";
      for (let i = 0; i < 6; i++) ctx.fillRect(420 + i * 18, 410, 10, 16 + (t % 8));
      drawParticles();
      label("시계접시(냉각)", 200, 140);
      label("아이오딘 증기", 200, 220);
      label("모래", 640, 380);
    }

    function updateComplex() {
      const phase = Math.min(1, t / 480);
      const step = phase < 0.25 ? 0 : phase < 0.5 ? 1 : phase < 0.75 ? 2 : 3;
      setStep(step);
      for (const p of particles) {
        if (step === 0 && p.type === "iron") {
          p.x += (800 - p.x) * 0.03; p.y += (180 - p.y) * 0.03;
        } else if (step === 1 && p.type === "sand") {
          p.y += (200 - p.y) * 0.04; p.x += (300 - p.x) * 0.03;
        } else if (step >= 2 && p.type === "water") {
          p.y -= 0.8; if (p.y < 70) p.r = Math.max(0, p.r - 0.05);
        } else if (step >= 2 && p.type === "salt") {
          p.x += (480 - p.x) * 0.02; p.y += (360 - p.y) * 0.02;
        } else if (p.type !== "iron" && step === 0) {
          p.vy += 0.02; p.y = Math.min(380, p.y + p.vy);
        }
      }
      ctx.fillStyle = "#1c1612";
      ctx.fillRect(250, 140, 460, 260);
      ctx.fillStyle = "#e11d48";
      ctx.fillRect(760, 140, 70, 90);
      ctx.fillStyle = "#2563eb";
      ctx.fillRect(760, 230, 70, 28);
      drawParticles();
      const names = ["1. 자석 → 철", "2. 거름 → 모래", "3. 증발 → 물", "4. 결정 → 소금"];
      label(names[step], 250, 120);
    }

    const drawers = { magnet: updateMagnet, filter: updateFilter, evaporate: updateEvaporate, distill: updateDistill, funnel: updateFunnel, chroma: updateChroma, sieve: updateSieve, sublime: updateSublime, complex: updateComplex };

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#100e0c";
      ctx.fillRect(0, 0, W, H);
      drawers[kind]();
    }

    return {
      reset() {
        running = false;
        cancelAnimationFrame(raf);
        t = 0;
        spawnMix();
        setStep(0);
        draw();
      },
      play() {
        if (running) {
          running = false;
          cancelAnimationFrame(raf);
          return false;
        }
        running = true;
        raf = requestAnimationFrame(loop);
        return true;
      },
      stop() {
        running = false;
        cancelAnimationFrame(raf);
      },
    };
  }
  */

  function renderQuiz() {
    const item = QUIZ[quizIndex];
    if (!item) {
      $("#quiz-q").textContent = `끝! ${quizScore} / ${QUIZ.length}점을 받았어요.`;
      $("#quiz-options").innerHTML = "";
      $("#quiz-feedback").textContent = quizScore === QUIZ.length ? "분리 원리를 아주 잘 이해했습니다." : "틀린 문항은 실험하기 탭에서 다시 관찰해 보세요.";
      $("#quiz-next").hidden = true;
      $("#quiz-restart").hidden = false;
      $("#quiz-progress").textContent = "완료";
      return;
    }
    quizLocked = false;
    $("#quiz-q").textContent = item.q;
    $("#quiz-options").innerHTML = item.choices.map((c, i) => `<button type="button" data-i="${i}">${c}</button>`).join("");
    $("#quiz-feedback").textContent = "";
    $("#quiz-next").hidden = true;
    $("#quiz-restart").hidden = true;
    $("#quiz-progress").textContent = `${quizIndex + 1} / ${QUIZ.length}`;
    $$("#quiz-options button").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (quizLocked) return;
        quizLocked = true;
        const i = Number(btn.dataset.i);
        $$("#quiz-options button").forEach((b, idx) => {
          if (idx === item.a) b.classList.add("is-correct");
          if (idx === i && i !== item.a) b.classList.add("is-wrong");
        });
        if (i === item.a) {
          quizScore += 1;
          $("#quiz-feedback").textContent = "맞았습니다. " + item.why;
        } else {
          $("#quiz-feedback").textContent = "아쉽습니다. " + item.why;
        }
        $("#quiz-next").hidden = false;
        $("#quiz-next").textContent = quizIndex >= QUIZ.length - 1 ? "결과 보기" : "다음 문제";
      });
    });
  }

  function bind() {
    $$(".tab").forEach((t) => t.addEventListener("click", () => showTab(t.dataset.tab)));
    $$("[data-goto]").forEach((b) => b.addEventListener("click", () => showTab(b.dataset.goto)));
    window.addEventListener("hashchange", () => {
      const id = location.hash.replace("#", "");
      if (["learn", "finder", "lab", "quiz"].includes(id)) showTab(id, false);
    });
    $("#plan-btn").addEventListener("click", renderPlan);
    $("#clear-substances").addEventListener("click", () => {
      selected.clear();
      $$("#substance-chips .chip").forEach((c) => c.classList.remove("is-on"));
      $("#plan-board").innerHTML = `<p class="empty-hint">물질을 고른 뒤 ‘분리 방법 설계하기’를 눌러 보세요.</p>`;
    });
    $("#sim-play").addEventListener("click", () => {
      if (!sim) return;
      const on = sim.play();
      $("#sim-play").textContent = on ? "일시정지" : "이어서";
    });
    $("#sim-prev").addEventListener("click", () => sim?.prev());
    $("#sim-next").addEventListener("click", () => sim?.next());
    $("#sim-reset").addEventListener("click", () => {
      sim?.reset();
      $("#sim-play").textContent = "실험 시작";
    });
    $("#quiz-next").addEventListener("click", () => {
      quizIndex += 1;
      renderQuiz();
    });
    $("#quiz-restart").addEventListener("click", () => {
      quizIndex = 0;
      quizScore = 0;
      renderQuiz();
    });
  }

  renderMethods();
  renderChips();
  renderPresets();
  renderQuiz();
  bind();
  startLab("magnet", false);
  const initial = location.hash.replace("#", "");
  if (["learn", "finder", "lab", "quiz"].includes(initial)) showTab(initial, false);
  else showTab("learn", false);
})();
