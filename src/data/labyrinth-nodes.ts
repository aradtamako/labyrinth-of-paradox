/**
 * 自動生成ファイル — scripts/gen-nodes.mjs で出力。直接編集しないこと。
 * 出典: https://dnf.umi.cat/ （区域ごとのノード配置・報酬データ）
 */

export interface RawReward {
  nameKr: string
  count?: number
  image?: string
}

export interface RawNode {
  row: number
  col: number
  typeId: string
  tier?: string
  icon: number
  rewards?: RawReward[]
}

export interface RawFloor {
  area: number
  seedCode: string
  cols: number
  rows: number
  nodes: RawNode[]
  edges: { from: [number, number]; to: [number, number] }[]
}

export interface RawNodeType {
  id: string
  nameKr: string
  descriptionKr: string
  icons: Record<string, number>
  defaultRewards: { image: string | null; label: string | null }[]
}

export const RAW_NODE_TYPES: RawNodeType[] = [
  {
    "id": "central_checkpoint_start",
    "nameKr": "메인 관문",
    "descriptionKr": "중앙에 위치한 거대한 관문. 다음 구역으로 이동하려면 반드시 통과해야 한다.",
    "icons": {
      "fixed": 0,
      "hover": 1
    },
    "defaultRewards": []
  },
  {
    "id": "central_checkpoint",
    "nameKr": "메인 관문",
    "descriptionKr": "중앙에 위치한 거대한 관문. 다음 구역으로 이동하려면 반드시 통과해야 한다.",
    "icons": {
      "fixed": 4,
      "hover": 5
    },
    "defaultRewards": []
  },
  {
    "id": "central_checkpoint_last",
    "nameKr": "메인 관문",
    "descriptionKr": "중앙에 위치한 거대한 관문. 다음 구역으로 이동하려면 반드시 통과해야 한다.",
    "icons": {
      "fixed": 8,
      "hover": 9
    },
    "defaultRewards": []
  },
  {
    "id": "relic_excavation_zone",
    "nameKr": "유물 발굴 지대",
    "descriptionKr": "조사를 통해 유물을 회수할 수 있는 구역. 유물을 사용하면 전투를 보조하는 힘을 얻지만, 어떤 유물을 획득할지는 알 수 없다.",
    "icons": {
      "fixed": 12,
      "hover": 13
    },
    "defaultRewards": []
  },
  {
    "id": "armament_warehouse",
    "nameKr": "장비 창고",
    "descriptionKr": "미약한 충격으로 여러 공간이 내비친다. 너머에 알 수 없는 무구가 있는 듯하다.",
    "icons": {
      "uncommon": 16,
      "rare": 24,
      "unique": 28,
      "legendary": 32,
      "epic": 36,
      "primeval": 40
    },
    "defaultRewards": [
      {
        "image": "/rewards/equipment_set_box_{tier}.PNG",
        "label": "自选"
      }
    ]
  },
  {
    "id": "giant_armament_warehouse",
    "nameKr": "오래된 장비 창고",
    "descriptionKr": "정리되지 않은 장비 데이터가 뒤섞여 저장된다. 접근 시마다 구성 정보가 달라진다. 다양한 장비가 발견되었다는 보고가 있다.",
    "icons": {
      "rare": 64,
      "unique": 68,
      "legendary": 72,
      "epic": 76,
      "primeval": 80
    },
    "defaultRewards": [
      {
        "image": "/rewards/equipment_set_box_{tier}.PNG",
        "label": "随机"
      }
    ]
  },
  {
    "id": "tuner_left_trace",
    "nameKr": "조율자의 자취",
    "descriptionKr": "자취만 남은 희미한 기록. 흐릿한 파편이 간헐적으로 드러난다.",
    "icons": {
      "rare": 84,
      "unique": 88,
      "legendary": 92,
      "epic": 96,
      "primeval": 100
    },
    "defaultRewards": [
      {
        "image": "/rewards/oath_crystal_box_{tier}.PNG",
        "label": null
      }
    ]
  },
  {
    "id": "labyrinth_supply_base",
    "nameKr": "미궁 개척 거점",
    "descriptionKr": "밝혀지지 않은 장소를 개척하기 전, 잠시 숨을 돌릴 수 있는 장소. 이 곳을 확보하면 새로운 길을 개척하기 위한 준비를 할 수 있을 것 같다.",
    "icons": {
      "key": 124,
      "ticket": 104
    },
    "defaultRewards": []
  },
  {
    "id": "chaotic_radiance_pilgrimage",
    "nameKr": "어긋난 광휘의 순례",
    "descriptionKr": "빛을 향해 나아가던 순례의 잔상. 정체를 알 수 없는 이유로 미궁에 스며들어, 본래의 광휘와는 다른 모습을 보인다.",
    "icons": {
      "fixed": 112,
      "hover": 113
    },
    "defaultRewards": [
      {
        "image": "/rewards/doom_oracle.PNG",
        "label": "账绑"
      }
    ]
  },
  {
    "id": "chaotic_life_pilgrimage",
    "nameKr": "어긋난 생명의 순례",
    "descriptionKr": "본래 다른 땅에서 이어지던 순례의 흔적. 어째서인지 역설의 미궁 안에 나타나, 의미를 잃은 채 왜곡된 길로 남아 있다.",
    "icons": {
      "fixed": 108,
      "hover": 109
    },
    "defaultRewards": []
  },
  {
    "id": "dual_phenomenon",
    "nameKr": "이중 현상 : 호수와 비공정",
    "descriptionKr": "이상 현상으로 두 공간이 동시에 겹쳐 보인다 깊은 곳 달이 잠긴 수면과 황혼을 가르는 거대한 비공정이 중첩된다.",
    "icons": {
      "fixed": 120,
      "hover": 121
    },
    "defaultRewards": []
  },
  {
    "id": "deviated_thousand_seas_sky",
    "nameKr": "이탈한 천해의 하늘",
    "descriptionKr": "생명의 흔적과 종말의 풍경이 함께 남은 장소. 이곳이 왜 미궁에 존재하는지는 알 수 없다.",
    "icons": {
      "fixed": 116,
      "hover": 117
    },
    "defaultRewards": []
  }
]

export const RAW_FLOORS: RawFloor[] = [
  {
    "area": 1,
    "seedCode": "11221",
    "cols": 7,
    "rows": 5,
    "nodes": [
      {
        "row": 0,
        "col": 0,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 0,
        "col": 1,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "종말의 계시 1개 상자",
            "count": 1000,
            "image": "/rewards/doom_oracle.PNG"
          }
        ]
      },
      {
        "row": 0,
        "col": 2,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 0,
        "col": 3,
        "typeId": "central_checkpoint_start",
        "icon": 0
      },
      {
        "row": 0,
        "col": 4,
        "typeId": "dual_phenomenon",
        "icon": 120
      },
      {
        "row": 1,
        "col": 0,
        "typeId": "tuner_left_trace",
        "tier": "unique",
        "icon": 88
      },
      {
        "row": 1,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 1,
        "col": 2,
        "typeId": "deviated_thousand_seas_sky",
        "icon": 116
      },
      {
        "row": 1,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 1,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 2,
        "col": 0,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "응축된 안개의 기억 (역설의 미궁)",
            "image": "/rewards/condensed_mist_memory.PNG"
          }
        ]
      },
      {
        "row": 2,
        "col": 1,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 2,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 2,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 2,
        "col": 4,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 2,
        "col": 5,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 3,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 3,
        "col": 2,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 3,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 3,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 3,
        "col": 5,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 0,
        "typeId": "giant_armament_warehouse",
        "tier": "unique",
        "icon": 68
      },
      {
        "row": 4,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 4,
        "col": 2,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "별을 품은 조율자의 저울",
            "image": "/rewards/tuner_scale_star.PNG"
          }
        ]
      },
      {
        "row": 4,
        "col": 3,
        "typeId": "central_checkpoint_last",
        "icon": 8
      },
      {
        "row": 4,
        "col": 4,
        "typeId": "armament_warehouse",
        "tier": "legendary",
        "icon": 32
      }
    ],
    "edges": [
      {
        "from": [
          0,
          1
        ],
        "to": [
          1,
          1
        ]
      },
      {
        "from": [
          1,
          0
        ],
        "to": [
          2,
          0
        ]
      }
    ]
  },
  {
    "area": 1,
    "seedCode": "12321",
    "cols": 7,
    "rows": 5,
    "nodes": [
      {
        "row": 0,
        "col": 0,
        "typeId": "tuner_left_trace",
        "tier": "unique",
        "icon": 88
      },
      {
        "row": 0,
        "col": 1,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 0,
        "col": 2,
        "typeId": "dual_phenomenon",
        "icon": 120
      },
      {
        "row": 0,
        "col": 3,
        "typeId": "central_checkpoint_start",
        "icon": 0
      },
      {
        "row": 0,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 1,
        "col": 1,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 1,
        "col": 2,
        "typeId": "deviated_thousand_seas_sky",
        "icon": 116
      },
      {
        "row": 1,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 1,
        "col": 4,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 1,
        "col": 5,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 2,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 2,
        "col": 2,
        "typeId": "giant_armament_warehouse",
        "tier": "unique",
        "icon": 68
      },
      {
        "row": 2,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 2,
        "col": 4,
        "typeId": "armament_warehouse",
        "tier": "legendary",
        "icon": 32
      },
      {
        "row": 2,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 2,
        "col": 6,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 3,
        "col": 1,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "응축된 안개의 기억 (역설의 미궁)",
            "image": "/rewards/condensed_mist_memory.PNG"
          }
        ]
      },
      {
        "row": 3,
        "col": 2,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "별을 품은 조율자의 저울",
            "image": "/rewards/tuner_scale_star.PNG"
          }
        ]
      },
      {
        "row": 3,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 3,
        "col": 4,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "종말의 계시 1개 상자",
            "count": 1000,
            "image": "/rewards/doom_oracle.PNG"
          }
        ]
      },
      {
        "row": 3,
        "col": 5,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 0,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 1,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 4,
        "col": 3,
        "typeId": "central_checkpoint_last",
        "icon": 8
      },
      {
        "row": 4,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      }
    ],
    "edges": [
      {
        "from": [
          1,
          4
        ],
        "to": [
          2,
          4
        ]
      },
      {
        "from": [
          2,
          1
        ],
        "to": [
          3,
          1
        ]
      }
    ]
  },
  {
    "area": 1,
    "seedCode": "13322",
    "cols": 7,
    "rows": 5,
    "nodes": [
      {
        "row": 0,
        "col": 0,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 0,
        "col": 1,
        "typeId": "armament_warehouse",
        "tier": "legendary",
        "icon": 32
      },
      {
        "row": 0,
        "col": 2,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 0,
        "col": 3,
        "typeId": "central_checkpoint_start",
        "icon": 0
      },
      {
        "row": 0,
        "col": 4,
        "typeId": "dual_phenomenon",
        "icon": 120
      },
      {
        "row": 1,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 1,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 1,
        "col": 4,
        "typeId": "deviated_thousand_seas_sky",
        "icon": 116
      },
      {
        "row": 1,
        "col": 5,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 1,
        "col": 6,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 2,
        "col": 2,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 2,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 2,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 2,
        "col": 5,
        "typeId": "giant_armament_warehouse",
        "tier": "unique",
        "icon": 68
      },
      {
        "row": 2,
        "col": 6,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 3,
        "col": 0,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "종말의 계시 1개 상자",
            "count": 1000,
            "image": "/rewards/doom_oracle.PNG"
          }
        ]
      },
      {
        "row": 3,
        "col": 1,
        "typeId": "tuner_left_trace",
        "tier": "unique",
        "icon": 88
      },
      {
        "row": 3,
        "col": 2,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "응축된 안개의 기억 (역설의 미궁)",
            "image": "/rewards/condensed_mist_memory.PNG"
          }
        ]
      },
      {
        "row": 3,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 3,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 3,
        "col": 5,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 1,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 4,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 3,
        "typeId": "central_checkpoint_last",
        "icon": 8
      },
      {
        "row": 4,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 4,
        "col": 5,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "별을 품은 조율자의 저울",
            "image": "/rewards/tuner_scale_star.PNG"
          }
        ]
      }
    ],
    "edges": [
      {
        "from": [
          3,
          1
        ],
        "to": [
          4,
          1
        ]
      },
      {
        "from": [
          1,
          4
        ],
        "to": [
          2,
          4
        ]
      }
    ]
  },
  {
    "area": 1,
    "seedCode": "22113",
    "cols": 7,
    "rows": 5,
    "nodes": [
      {
        "row": 0,
        "col": 1,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "응축된 안개의 기억 (역설의 미궁)",
            "image": "/rewards/condensed_mist_memory.PNG"
          }
        ]
      },
      {
        "row": 0,
        "col": 2,
        "typeId": "dual_phenomenon",
        "icon": 120
      },
      {
        "row": 0,
        "col": 3,
        "typeId": "central_checkpoint_start",
        "icon": 0
      },
      {
        "row": 0,
        "col": 4,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 0,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 1,
        "col": 1,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 1,
        "col": 2,
        "typeId": "deviated_thousand_seas_sky",
        "icon": 116
      },
      {
        "row": 1,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 1,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 1,
        "col": 5,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 2,
        "col": 0,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "별을 품은 조율자의 저울",
            "image": "/rewards/tuner_scale_star.PNG"
          }
        ]
      },
      {
        "row": 2,
        "col": 1,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 2,
        "col": 2,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "종말의 계시 1개 상자",
            "count": 1000,
            "image": "/rewards/doom_oracle.PNG"
          }
        ]
      },
      {
        "row": 2,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 2,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 3,
        "col": 0,
        "typeId": "tuner_left_trace",
        "tier": "unique",
        "icon": 88
      },
      {
        "row": 3,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 3,
        "col": 2,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 3,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 3,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 4,
        "col": 2,
        "typeId": "armament_warehouse",
        "tier": "legendary",
        "icon": 32
      },
      {
        "row": 4,
        "col": 3,
        "typeId": "central_checkpoint_last",
        "icon": 8
      },
      {
        "row": 4,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 4,
        "col": 5,
        "typeId": "giant_armament_warehouse",
        "tier": "unique",
        "icon": 68
      },
      {
        "row": 4,
        "col": 6,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      }
    ],
    "edges": [
      {
        "from": [
          1,
          1
        ],
        "to": [
          2,
          1
        ]
      },
      {
        "from": [
          3,
          2
        ],
        "to": [
          4,
          2
        ]
      }
    ]
  },
  {
    "area": 1,
    "seedCode": "23132",
    "cols": 7,
    "rows": 5,
    "nodes": [
      {
        "row": 0,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 0,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 0,
        "col": 3,
        "typeId": "central_checkpoint_start",
        "icon": 0
      },
      {
        "row": 0,
        "col": 4,
        "typeId": "dual_phenomenon",
        "icon": 120
      },
      {
        "row": 0,
        "col": 5,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 1,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 1,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 1,
        "col": 4,
        "typeId": "deviated_thousand_seas_sky",
        "icon": 116
      },
      {
        "row": 1,
        "col": 5,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "별을 품은 조율자의 저울",
            "image": "/rewards/tuner_scale_star.PNG"
          }
        ]
      },
      {
        "row": 1,
        "col": 6,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "응축된 안개의 기억 (역설의 미궁)",
            "image": "/rewards/condensed_mist_memory.PNG"
          }
        ]
      },
      {
        "row": 2,
        "col": 0,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 2,
        "col": 1,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 2,
        "col": 2,
        "typeId": "tuner_left_trace",
        "tier": "unique",
        "icon": 88
      },
      {
        "row": 2,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 2,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 3,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 3,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 3,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 3,
        "col": 5,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "종말의 계시 1개 상자",
            "count": 1000,
            "image": "/rewards/doom_oracle.PNG"
          }
        ]
      },
      {
        "row": 3,
        "col": 6,
        "typeId": "armament_warehouse",
        "tier": "legendary",
        "icon": 32
      },
      {
        "row": 4,
        "col": 0,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 1,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 4,
        "col": 2,
        "typeId": "giant_armament_warehouse",
        "tier": "unique",
        "icon": 68
      },
      {
        "row": 4,
        "col": 3,
        "typeId": "central_checkpoint_last",
        "icon": 8
      },
      {
        "row": 4,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 5,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      }
    ],
    "edges": [
      {
        "from": [
          0,
          4
        ],
        "to": [
          1,
          4
        ]
      },
      {
        "from": [
          3,
          5
        ],
        "to": [
          4,
          5
        ]
      }
    ]
  },
  {
    "area": 2,
    "seedCode": "12322",
    "cols": 7,
    "rows": 5,
    "nodes": [
      {
        "row": 0,
        "col": 1,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 0,
        "col": 2,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "순례의 인장",
            "count": 1000,
            "image": "/rewards/pilgrimage_seal.PNG"
          }
        ]
      },
      {
        "row": 0,
        "col": 3,
        "typeId": "central_checkpoint_start",
        "icon": 0
      },
      {
        "row": 0,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 1,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 1,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 1,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 1,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 1,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 2,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 2,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 2,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 2,
        "col": 4,
        "typeId": "giant_armament_warehouse",
        "tier": "unique",
        "icon": 68
      },
      {
        "row": 2,
        "col": 5,
        "typeId": "deviated_thousand_seas_sky",
        "icon": 116
      },
      {
        "row": 2,
        "col": 6,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 3,
        "col": 1,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 3,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 3,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 3,
        "col": 4,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "태초 레거시 ▶ 레거시 변환서 상자",
            "image": "/rewards/primeval_legacy_convert_box.PNG"
          }
        ]
      },
      {
        "row": 3,
        "col": 5,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 1,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 2,
        "typeId": "tuner_left_trace",
        "tier": "unique",
        "icon": 88
      },
      {
        "row": 4,
        "col": 3,
        "typeId": "central_checkpoint_last",
        "icon": 8
      },
      {
        "row": 4,
        "col": 4,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "프라임 스텔라 1개 상자",
            "image": "/rewards/prime_stella.PNG"
          }
        ]
      },
      {
        "row": 4,
        "col": 5,
        "typeId": "armament_warehouse",
        "tier": "primeval",
        "icon": 40
      }
    ],
    "edges": [
      {
        "from": [
          1,
          4
        ],
        "to": [
          2,
          4
        ]
      },
      {
        "from": [
          3,
          5
        ],
        "to": [
          4,
          5
        ]
      }
    ]
  },
  {
    "area": 2,
    "seedCode": "22222",
    "cols": 7,
    "rows": 5,
    "nodes": [
      {
        "row": 0,
        "col": 1,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 0,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 0,
        "col": 3,
        "typeId": "central_checkpoint_start",
        "icon": 0
      },
      {
        "row": 0,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 0,
        "col": 5,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 1,
        "col": 1,
        "typeId": "giant_armament_warehouse",
        "tier": "unique",
        "icon": 68
      },
      {
        "row": 1,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 1,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 1,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 1,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 2,
        "col": 1,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 2,
        "col": 2,
        "typeId": "deviated_thousand_seas_sky",
        "icon": 116
      },
      {
        "row": 2,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 2,
        "col": 4,
        "typeId": "armament_warehouse",
        "tier": "primeval",
        "icon": 40
      },
      {
        "row": 2,
        "col": 5,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "태초 레거시 ▶ 레거시 변환서 상자",
            "image": "/rewards/primeval_legacy_convert_box.PNG"
          }
        ]
      },
      {
        "row": 3,
        "col": 1,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 3,
        "col": 2,
        "typeId": "tuner_left_trace",
        "tier": "unique",
        "icon": 88
      },
      {
        "row": 3,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 3,
        "col": 4,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "프라임 스텔라 1개 상자",
            "image": "/rewards/prime_stella.PNG"
          }
        ]
      },
      {
        "row": 3,
        "col": 5,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "순례의 인장",
            "count": 1000,
            "image": "/rewards/pilgrimage_seal.PNG"
          }
        ]
      },
      {
        "row": 4,
        "col": 1,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 4,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 3,
        "typeId": "central_checkpoint_last",
        "icon": 8
      },
      {
        "row": 4,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 4,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      }
    ],
    "edges": [
      {
        "from": [
          0,
          1
        ],
        "to": [
          1,
          1
        ]
      },
      {
        "from": [
          3,
          1
        ],
        "to": [
          4,
          1
        ]
      }
    ]
  },
  {
    "area": 2,
    "seedCode": "22232",
    "cols": 7,
    "rows": 5,
    "nodes": [
      {
        "row": 0,
        "col": 2,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "프라임 스텔라 1개 상자",
            "image": "/rewards/prime_stella.PNG"
          }
        ]
      },
      {
        "row": 0,
        "col": 3,
        "typeId": "central_checkpoint_start",
        "icon": 0
      },
      {
        "row": 0,
        "col": 4,
        "typeId": "giant_armament_warehouse",
        "tier": "unique",
        "icon": 68
      },
      {
        "row": 0,
        "col": 5,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "태초 레거시 ▶ 레거시 변환서 상자",
            "image": "/rewards/primeval_legacy_convert_box.PNG"
          }
        ]
      },
      {
        "row": 1,
        "col": 1,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 1,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 1,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 1,
        "col": 4,
        "typeId": "armament_warehouse",
        "tier": "primeval",
        "icon": 40
      },
      {
        "row": 1,
        "col": 5,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 2,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 2,
        "col": 2,
        "typeId": "deviated_thousand_seas_sky",
        "icon": 116
      },
      {
        "row": 2,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 2,
        "col": 4,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 2,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 3,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 3,
        "col": 2,
        "typeId": "tuner_left_trace",
        "tier": "unique",
        "icon": 88
      },
      {
        "row": 3,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 3,
        "col": 4,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "순례의 인장",
            "count": 1000,
            "image": "/rewards/pilgrimage_seal.PNG"
          }
        ]
      },
      {
        "row": 3,
        "col": 5,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 3,
        "col": 6,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 4,
        "col": 1,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 3,
        "typeId": "central_checkpoint_last",
        "icon": 8
      },
      {
        "row": 4,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      }
    ],
    "edges": [
      {
        "from": [
          2,
          1
        ],
        "to": [
          3,
          1
        ]
      },
      {
        "from": [
          3,
          2
        ],
        "to": [
          4,
          2
        ]
      }
    ]
  },
  {
    "area": 2,
    "seedCode": "31222",
    "cols": 7,
    "rows": 5,
    "nodes": [
      {
        "row": 0,
        "col": 1,
        "typeId": "armament_warehouse",
        "tier": "primeval",
        "icon": 40
      },
      {
        "row": 0,
        "col": 2,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 0,
        "col": 3,
        "typeId": "central_checkpoint_start",
        "icon": 0
      },
      {
        "row": 0,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 0,
        "col": 5,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "순례의 인장",
            "count": 1000,
            "image": "/rewards/pilgrimage_seal.PNG"
          }
        ]
      },
      {
        "row": 0,
        "col": 6,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 1,
        "col": 1,
        "typeId": "giant_armament_warehouse",
        "tier": "unique",
        "icon": 68
      },
      {
        "row": 1,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 1,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 1,
        "col": 4,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 2,
        "col": 1,
        "typeId": "deviated_thousand_seas_sky",
        "icon": 116
      },
      {
        "row": 2,
        "col": 2,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 2,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 2,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 2,
        "col": 5,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "프라임 스텔라 1개 상자",
            "image": "/rewards/prime_stella.PNG"
          }
        ]
      },
      {
        "row": 3,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 3,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 3,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 3,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 3,
        "col": 5,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 1,
        "typeId": "tuner_left_trace",
        "tier": "unique",
        "icon": 88
      },
      {
        "row": 4,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 4,
        "col": 3,
        "typeId": "central_checkpoint_last",
        "icon": 8
      },
      {
        "row": 4,
        "col": 4,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "태초 레거시 ▶ 레거시 변환서 상자",
            "image": "/rewards/primeval_legacy_convert_box.PNG"
          }
        ]
      },
      {
        "row": 4,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      }
    ],
    "edges": [
      {
        "from": [
          1,
          1
        ],
        "to": [
          2,
          1
        ]
      },
      {
        "from": [
          3,
          1
        ],
        "to": [
          4,
          1
        ]
      }
    ]
  },
  {
    "area": 2,
    "seedCode": "32122",
    "cols": 7,
    "rows": 5,
    "nodes": [
      {
        "row": 0,
        "col": 1,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 0,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 0,
        "col": 3,
        "typeId": "central_checkpoint_start",
        "icon": 0
      },
      {
        "row": 0,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 0,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 0,
        "col": 6,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 1,
        "col": 1,
        "typeId": "giant_armament_warehouse",
        "tier": "unique",
        "icon": 68
      },
      {
        "row": 1,
        "col": 2,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 1,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 1,
        "col": 4,
        "typeId": "armament_warehouse",
        "tier": "primeval",
        "icon": 40
      },
      {
        "row": 1,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 2,
        "col": 1,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 2,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 2,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 2,
        "col": 4,
        "typeId": "deviated_thousand_seas_sky",
        "icon": 116
      },
      {
        "row": 3,
        "col": 1,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "순례의 인장",
            "count": 1000,
            "image": "/rewards/pilgrimage_seal.PNG"
          }
        ]
      },
      {
        "row": 3,
        "col": 2,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "태초 레거시 ▶ 레거시 변환서 상자",
            "image": "/rewards/primeval_legacy_convert_box.PNG"
          }
        ]
      },
      {
        "row": 3,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 3,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 3,
        "col": 5,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "프라임 스텔라 1개 상자",
            "image": "/rewards/prime_stella.PNG"
          }
        ]
      },
      {
        "row": 4,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 4,
        "col": 2,
        "typeId": "tuner_left_trace",
        "tier": "unique",
        "icon": 88
      },
      {
        "row": 4,
        "col": 3,
        "typeId": "central_checkpoint_last",
        "icon": 8
      },
      {
        "row": 4,
        "col": 4,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 4,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      }
    ],
    "edges": [
      {
        "from": [
          0,
          2
        ],
        "to": [
          1,
          2
        ]
      },
      {
        "from": [
          3,
          1
        ],
        "to": [
          4,
          1
        ]
      }
    ]
  },
  {
    "area": 3,
    "seedCode": "11222",
    "cols": 7,
    "rows": 5,
    "nodes": [
      {
        "row": 0,
        "col": 1,
        "typeId": "armament_warehouse",
        "tier": "epic",
        "icon": 36
      },
      {
        "row": 0,
        "col": 2,
        "typeId": "giant_armament_warehouse",
        "tier": "legendary",
        "icon": 72
      },
      {
        "row": 0,
        "col": 3,
        "typeId": "central_checkpoint_start",
        "icon": 0
      },
      {
        "row": 0,
        "col": 4,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 1,
        "col": 1,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 1,
        "col": 2,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 1,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 1,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 2,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 2,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 2,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 2,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 2,
        "col": 5,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 3,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 3,
        "col": 2,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "보이드 소울",
            "count": 100,
            "image": "/rewards/void_souls.PNG"
          }
        ]
      },
      {
        "row": 3,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 3,
        "col": 4,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 3,
        "col": 5,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 1,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "순례의 인장",
            "count": 1000,
            "image": "/rewards/pilgrimage_seal.PNG"
          }
        ]
      },
      {
        "row": 4,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 4,
        "col": 3,
        "typeId": "central_checkpoint_last",
        "icon": 8
      },
      {
        "row": 4,
        "col": 4,
        "typeId": "dual_phenomenon",
        "icon": 120
      },
      {
        "row": 4,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      }
    ],
    "edges": [
      {
        "from": [
          0,
          4
        ],
        "to": [
          1,
          4
        ]
      },
      {
        "from": [
          2,
          5
        ],
        "to": [
          3,
          5
        ]
      }
    ]
  },
  {
    "area": 3,
    "seedCode": "12322",
    "cols": 7,
    "rows": 5,
    "nodes": [
      {
        "row": 0,
        "col": 1,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 0,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 0,
        "col": 3,
        "typeId": "central_checkpoint_start",
        "icon": 0
      },
      {
        "row": 0,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 1,
        "col": 1,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 1,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 1,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 1,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 1,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 2,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 2,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 2,
        "col": 4,
        "typeId": "armament_warehouse",
        "tier": "epic",
        "icon": 36
      },
      {
        "row": 2,
        "col": 5,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "보이드 소울",
            "count": 100,
            "image": "/rewards/void_souls.PNG"
          }
        ]
      },
      {
        "row": 2,
        "col": 6,
        "typeId": "giant_armament_warehouse",
        "tier": "legendary",
        "icon": 72
      },
      {
        "row": 3,
        "col": 1,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "순례의 인장",
            "count": 1000,
            "image": "/rewards/pilgrimage_seal.PNG"
          }
        ]
      },
      {
        "row": 3,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 3,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 3,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 3,
        "col": 5,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 4,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 3,
        "typeId": "central_checkpoint_last",
        "icon": 8
      },
      {
        "row": 4,
        "col": 4,
        "typeId": "dual_phenomenon",
        "icon": 120
      },
      {
        "row": 4,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      }
    ],
    "edges": [
      {
        "from": [
          0,
          4
        ],
        "to": [
          1,
          4
        ]
      },
      {
        "from": [
          2,
          5
        ],
        "to": [
          3,
          5
        ]
      }
    ]
  },
  {
    "area": 3,
    "seedCode": "21211",
    "cols": 7,
    "rows": 5,
    "nodes": [
      {
        "row": 0,
        "col": 1,
        "typeId": "giant_armament_warehouse",
        "tier": "legendary",
        "icon": 72
      },
      {
        "row": 0,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 0,
        "col": 3,
        "typeId": "central_checkpoint_start",
        "icon": 0
      },
      {
        "row": 0,
        "col": 4,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "순례의 인장",
            "count": 1000,
            "image": "/rewards/pilgrimage_seal.PNG"
          }
        ]
      },
      {
        "row": 0,
        "col": 5,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 1,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 1,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 1,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 1,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 2,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 2,
        "col": 2,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "보이드 소울",
            "count": 100,
            "image": "/rewards/void_souls.PNG"
          }
        ]
      },
      {
        "row": 2,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 2,
        "col": 4,
        "typeId": "armament_warehouse",
        "tier": "epic",
        "icon": 36
      },
      {
        "row": 2,
        "col": 5,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 3,
        "col": 1,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 3,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 3,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 3,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 4,
        "col": 0,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 4,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 4,
        "col": 2,
        "typeId": "dual_phenomenon",
        "icon": 120
      },
      {
        "row": 4,
        "col": 3,
        "typeId": "central_checkpoint_last",
        "icon": 8
      },
      {
        "row": 4,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      }
    ],
    "edges": [
      {
        "from": [
          0,
          1
        ],
        "to": [
          1,
          1
        ]
      },
      {
        "from": [
          2,
          1
        ],
        "to": [
          3,
          1
        ]
      }
    ]
  },
  {
    "area": 3,
    "seedCode": "21223",
    "cols": 7,
    "rows": 5,
    "nodes": [
      {
        "row": 0,
        "col": 1,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 0,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 0,
        "col": 3,
        "typeId": "central_checkpoint_start",
        "icon": 0
      },
      {
        "row": 0,
        "col": 4,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 0,
        "col": 5,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "순례의 인장",
            "count": 1000,
            "image": "/rewards/pilgrimage_seal.PNG"
          }
        ]
      },
      {
        "row": 1,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 1,
        "col": 2,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 1,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 1,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 2,
        "col": 1,
        "typeId": "giant_armament_warehouse",
        "tier": "legendary",
        "icon": 72
      },
      {
        "row": 2,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 2,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 2,
        "col": 4,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "보이드 소울",
            "count": 100,
            "image": "/rewards/void_souls.PNG"
          }
        ]
      },
      {
        "row": 2,
        "col": 5,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 3,
        "col": 2,
        "typeId": "armament_warehouse",
        "tier": "epic",
        "icon": 36
      },
      {
        "row": 3,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 3,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 3,
        "col": 5,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 2,
        "typeId": "dual_phenomenon",
        "icon": 120
      },
      {
        "row": 4,
        "col": 3,
        "typeId": "central_checkpoint_last",
        "icon": 8
      },
      {
        "row": 4,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 5,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 4,
        "col": 6,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      }
    ],
    "edges": [
      {
        "from": [
          2,
          2
        ],
        "to": [
          3,
          2
        ]
      },
      {
        "from": [
          3,
          5
        ],
        "to": [
          4,
          5
        ]
      }
    ]
  },
  {
    "area": 3,
    "seedCode": "22221",
    "cols": 7,
    "rows": 5,
    "nodes": [
      {
        "row": 0,
        "col": 1,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 0,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 0,
        "col": 3,
        "typeId": "central_checkpoint_start",
        "icon": 0
      },
      {
        "row": 0,
        "col": 4,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 0,
        "col": 5,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "순례의 인장",
            "count": 1000,
            "image": "/rewards/pilgrimage_seal.PNG"
          }
        ]
      },
      {
        "row": 1,
        "col": 1,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 1,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 1,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 1,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 1,
        "col": 5,
        "typeId": "giant_armament_warehouse",
        "tier": "legendary",
        "icon": 72
      },
      {
        "row": 2,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 2,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 2,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 2,
        "col": 4,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "보이드 소울",
            "count": 100,
            "image": "/rewards/void_souls.PNG"
          }
        ]
      },
      {
        "row": 2,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 3,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 3,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 3,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 3,
        "col": 5,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 4,
        "col": 1,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 2,
        "typeId": "armament_warehouse",
        "tier": "epic",
        "icon": 36
      },
      {
        "row": 4,
        "col": 3,
        "typeId": "central_checkpoint_last",
        "icon": 8
      },
      {
        "row": 4,
        "col": 4,
        "typeId": "dual_phenomenon",
        "icon": 120
      }
    ],
    "edges": [
      {
        "from": [
          1,
          2
        ],
        "to": [
          2,
          2
        ]
      },
      {
        "from": [
          3,
          4
        ],
        "to": [
          4,
          4
        ]
      }
    ]
  },
  {
    "area": 4,
    "seedCode": "配置1",
    "cols": 7,
    "rows": 5,
    "nodes": [
      {
        "row": 0,
        "col": 1,
        "typeId": "giant_armament_warehouse",
        "tier": "epic",
        "icon": 76
      },
      {
        "row": 0,
        "col": 2,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 0,
        "col": 3,
        "typeId": "central_checkpoint_start",
        "icon": 0
      },
      {
        "row": 0,
        "col": 4,
        "typeId": "tuner_left_trace",
        "tier": "unique",
        "icon": 88
      },
      {
        "row": 0,
        "col": 5,
        "typeId": "deviated_thousand_seas_sky",
        "icon": 116
      },
      {
        "row": 1,
        "col": 1,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 1,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 1,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 1,
        "col": 4,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 1,
        "col": 5,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "순례의 인장",
            "count": 1000,
            "image": "/rewards/pilgrimage_seal.PNG"
          }
        ]
      },
      {
        "row": 2,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 2,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 2,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 2,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 2,
        "col": 5,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 3,
        "col": 1,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "종말의 계시 1개 상자",
            "count": 1000,
            "image": "/rewards/doom_oracle.PNG"
          }
        ]
      },
      {
        "row": 3,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 3,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 3,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 3,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 4,
        "col": 1,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 3,
        "typeId": "central_checkpoint_last",
        "icon": 8
      },
      {
        "row": 4,
        "col": 4,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "응축된 안개의 기억 (역설의 미궁)",
            "image": "/rewards/condensed_mist_memory.PNG"
          }
        ]
      },
      {
        "row": 4,
        "col": 5,
        "typeId": "relic_excavation_zone",
        "icon": 12
      }
    ],
    "edges": [
      {
        "from": [
          0,
          4
        ],
        "to": [
          1,
          4
        ]
      },
      {
        "from": [
          2,
          2
        ],
        "to": [
          3,
          2
        ]
      }
    ]
  },
  {
    "area": 4,
    "seedCode": "配置2",
    "cols": 7,
    "rows": 5,
    "nodes": [
      {
        "row": 0,
        "col": 1,
        "typeId": "tuner_left_trace",
        "tier": "unique",
        "icon": 88
      },
      {
        "row": 0,
        "col": 2,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 0,
        "col": 3,
        "typeId": "central_checkpoint_start",
        "icon": 0
      },
      {
        "row": 0,
        "col": 4,
        "typeId": "deviated_thousand_seas_sky",
        "icon": 116
      },
      {
        "row": 0,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 1,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 1,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 1,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 1,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 1,
        "col": 5,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "종말의 계시 1개 상자",
            "count": 1000,
            "image": "/rewards/doom_oracle.PNG"
          }
        ]
      },
      {
        "row": 2,
        "col": 1,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 2,
        "col": 2,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 2,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 2,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 2,
        "col": 5,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 3,
        "col": 1,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "응축된 안개의 기억 (역설의 미궁)",
            "image": "/rewards/condensed_mist_memory.PNG"
          }
        ]
      },
      {
        "row": 3,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 3,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 3,
        "col": 4,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 3,
        "col": 5,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 4,
        "col": 2,
        "typeId": "giant_armament_warehouse",
        "tier": "epic",
        "icon": 76
      },
      {
        "row": 4,
        "col": 3,
        "typeId": "central_checkpoint_last",
        "icon": 8
      },
      {
        "row": 4,
        "col": 4,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "순례의 인장",
            "count": 1000,
            "image": "/rewards/pilgrimage_seal.PNG"
          }
        ]
      },
      {
        "row": 4,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      }
    ],
    "edges": [
      {
        "from": [
          1,
          1
        ],
        "to": [
          2,
          1
        ]
      },
      {
        "from": [
          2,
          2
        ],
        "to": [
          3,
          2
        ]
      }
    ]
  },
  {
    "area": 4,
    "seedCode": "配置3",
    "cols": 7,
    "rows": 5,
    "nodes": [
      {
        "row": 0,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 0,
        "col": 2,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "응축된 안개의 기억 (역설의 미궁)",
            "image": "/rewards/condensed_mist_memory.PNG"
          }
        ]
      },
      {
        "row": 0,
        "col": 3,
        "typeId": "central_checkpoint_start",
        "icon": 0
      },
      {
        "row": 0,
        "col": 4,
        "typeId": "deviated_thousand_seas_sky",
        "icon": 116
      },
      {
        "row": 0,
        "col": 5,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 1,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 1,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 1,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 1,
        "col": 4,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 1,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 2,
        "col": 1,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 2,
        "col": 2,
        "typeId": "tuner_left_trace",
        "tier": "unique",
        "icon": 88
      },
      {
        "row": 2,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 2,
        "col": 4,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "순례의 인장",
            "count": 1000,
            "image": "/rewards/pilgrimage_seal.PNG"
          }
        ]
      },
      {
        "row": 2,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 3,
        "col": 1,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 3,
        "col": 2,
        "typeId": "giant_armament_warehouse",
        "tier": "epic",
        "icon": 76
      },
      {
        "row": 3,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 3,
        "col": 4,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "종말의 계시 1개 상자",
            "count": 1000,
            "image": "/rewards/doom_oracle.PNG"
          }
        ]
      },
      {
        "row": 3,
        "col": 5,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 1,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 3,
        "typeId": "central_checkpoint_last",
        "icon": 8
      },
      {
        "row": 4,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 4,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      }
    ],
    "edges": [
      {
        "from": [
          0,
          2
        ],
        "to": [
          1,
          2
        ]
      },
      {
        "from": [
          2,
          1
        ],
        "to": [
          3,
          1
        ]
      }
    ]
  },
  {
    "area": 4,
    "seedCode": "配置4",
    "cols": 7,
    "rows": 5,
    "nodes": [
      {
        "row": 0,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 0,
        "col": 2,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 0,
        "col": 3,
        "typeId": "central_checkpoint_start",
        "icon": 0
      },
      {
        "row": 0,
        "col": 4,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "응축된 안개의 기억 (역설의 미궁)",
            "image": "/rewards/condensed_mist_memory.PNG"
          }
        ]
      },
      {
        "row": 0,
        "col": 5,
        "typeId": "deviated_thousand_seas_sky",
        "icon": 116
      },
      {
        "row": 1,
        "col": 1,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 1,
        "col": 2,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 1,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 1,
        "col": 4,
        "typeId": "giant_armament_warehouse",
        "tier": "epic",
        "icon": 76
      },
      {
        "row": 1,
        "col": 5,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 2,
        "col": 1,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 2,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 2,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 2,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 2,
        "col": 5,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 3,
        "col": 1,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 3,
        "col": 2,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "종말의 계시 1개 상자",
            "count": 1000,
            "image": "/rewards/doom_oracle.PNG"
          }
        ]
      },
      {
        "row": 3,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 3,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 3,
        "col": 5,
        "typeId": "tuner_left_trace",
        "tier": "unique",
        "icon": 88
      },
      {
        "row": 4,
        "col": 1,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "순례의 인장",
            "count": 1000,
            "image": "/rewards/pilgrimage_seal.PNG"
          }
        ]
      },
      {
        "row": 4,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 3,
        "typeId": "central_checkpoint_last",
        "icon": 8
      },
      {
        "row": 4,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 4,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      }
    ],
    "edges": [
      {
        "from": [
          0,
          2
        ],
        "to": [
          1,
          2
        ]
      },
      {
        "from": [
          1,
          4
        ],
        "to": [
          2,
          4
        ]
      }
    ]
  },
  {
    "area": 4,
    "seedCode": "配置5",
    "cols": 7,
    "rows": 5,
    "nodes": [
      {
        "row": 0,
        "col": 1,
        "typeId": "deviated_thousand_seas_sky",
        "icon": 116
      },
      {
        "row": 0,
        "col": 2,
        "typeId": "tuner_left_trace",
        "tier": "unique",
        "icon": 88
      },
      {
        "row": 0,
        "col": 3,
        "typeId": "central_checkpoint_start",
        "icon": 0
      },
      {
        "row": 0,
        "col": 4,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 0,
        "col": 5,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 1,
        "col": 1,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "순례의 인장",
            "count": 1000,
            "image": "/rewards/pilgrimage_seal.PNG"
          }
        ]
      },
      {
        "row": 1,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 1,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 1,
        "col": 4,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "종말의 계시 1개 상자",
            "count": 1000,
            "image": "/rewards/doom_oracle.PNG"
          }
        ]
      },
      {
        "row": 1,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 2,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 2,
        "col": 2,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 2,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 2,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 2,
        "col": 5,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "응축된 안개의 기억 (역설의 미궁)",
            "image": "/rewards/condensed_mist_memory.PNG"
          }
        ]
      },
      {
        "row": 3,
        "col": 1,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 3,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 3,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 3,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 3,
        "col": 5,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 4,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 3,
        "typeId": "central_checkpoint_last",
        "icon": 8
      },
      {
        "row": 4,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 5,
        "typeId": "giant_armament_warehouse",
        "tier": "epic",
        "icon": 76
      }
    ],
    "edges": [
      {
        "from": [
          1,
          2
        ],
        "to": [
          2,
          2
        ]
      },
      {
        "from": [
          2,
          4
        ],
        "to": [
          3,
          4
        ]
      }
    ]
  },
  {
    "area": 5,
    "seedCode": "12222",
    "cols": 7,
    "rows": 5,
    "nodes": [
      {
        "row": 0,
        "col": 0,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 0,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 0,
        "col": 2,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 0,
        "col": 3,
        "typeId": "central_checkpoint_start",
        "icon": 0
      },
      {
        "row": 0,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 1,
        "col": 1,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 1,
        "col": 2,
        "typeId": "deviated_thousand_seas_sky",
        "icon": 116
      },
      {
        "row": 1,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 1,
        "col": 4,
        "typeId": "tuner_left_trace",
        "tier": "legendary",
        "icon": 92
      },
      {
        "row": 1,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 2,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 2,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 2,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 2,
        "col": 4,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "순례의 인장",
            "count": 1000,
            "image": "/rewards/pilgrimage_seal.PNG"
          }
        ]
      },
      {
        "row": 2,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 3,
        "col": 1,
        "typeId": "giant_armament_warehouse",
        "tier": "primeval",
        "icon": 80
      },
      {
        "row": 3,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 3,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 3,
        "col": 4,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "보이드 소울",
            "count": 100,
            "image": "/rewards/void_souls.PNG"
          }
        ]
      },
      {
        "row": 3,
        "col": 5,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 4,
        "col": 1,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 2,
        "typeId": "armament_warehouse",
        "tier": "epic",
        "icon": 36
      },
      {
        "row": 4,
        "col": 3,
        "typeId": "central_checkpoint_last",
        "icon": 8
      },
      {
        "row": 4,
        "col": 4,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 4,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      }
    ],
    "edges": [
      {
        "from": [
          0,
          1
        ],
        "to": [
          1,
          1
        ]
      },
      {
        "from": [
          3,
          5
        ],
        "to": [
          4,
          5
        ]
      }
    ]
  },
  {
    "area": 5,
    "seedCode": "21222",
    "cols": 7,
    "rows": 5,
    "nodes": [
      {
        "row": 0,
        "col": 0,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 0,
        "col": 1,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "보이드 소울",
            "count": 100,
            "image": "/rewards/void_souls.PNG"
          }
        ]
      },
      {
        "row": 0,
        "col": 2,
        "typeId": "tuner_left_trace",
        "tier": "legendary",
        "icon": 92
      },
      {
        "row": 0,
        "col": 3,
        "typeId": "central_checkpoint_start",
        "icon": 0
      },
      {
        "row": 0,
        "col": 4,
        "typeId": "armament_warehouse",
        "tier": "epic",
        "icon": 36
      },
      {
        "row": 0,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 1,
        "col": 1,
        "typeId": "giant_armament_warehouse",
        "tier": "primeval",
        "icon": 80
      },
      {
        "row": 1,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 1,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 1,
        "col": 4,
        "typeId": "deviated_thousand_seas_sky",
        "icon": 116
      },
      {
        "row": 2,
        "col": 1,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 2,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 2,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 2,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 2,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 3,
        "col": 1,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 3,
        "col": 2,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "순례의 인장",
            "count": 1000,
            "image": "/rewards/pilgrimage_seal.PNG"
          }
        ]
      },
      {
        "row": 3,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 3,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 3,
        "col": 5,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 1,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 4,
        "col": 3,
        "typeId": "central_checkpoint_last",
        "icon": 8
      },
      {
        "row": 4,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 5,
        "typeId": "relic_excavation_zone",
        "icon": 12
      }
    ],
    "edges": [
      {
        "from": [
          0,
          1
        ],
        "to": [
          1,
          1
        ]
      },
      {
        "from": [
          1,
          4
        ],
        "to": [
          2,
          4
        ]
      }
    ]
  },
  {
    "area": 5,
    "seedCode": "21232",
    "cols": 7,
    "rows": 5,
    "nodes": [
      {
        "row": 0,
        "col": 1,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 0,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 0,
        "col": 3,
        "typeId": "central_checkpoint_start",
        "icon": 0
      },
      {
        "row": 0,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 0,
        "col": 5,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 1,
        "col": 0,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 1,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 1,
        "col": 2,
        "typeId": "deviated_thousand_seas_sky",
        "icon": 116
      },
      {
        "row": 1,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 1,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 2,
        "col": 1,
        "typeId": "tuner_left_trace",
        "tier": "legendary",
        "icon": 92
      },
      {
        "row": 2,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 2,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 2,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 2,
        "col": 5,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "순례의 인장",
            "count": 1000,
            "image": "/rewards/pilgrimage_seal.PNG"
          }
        ]
      },
      {
        "row": 3,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 3,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 3,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 3,
        "col": 5,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 3,
        "col": 6,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 4,
        "col": 1,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "보이드 소울",
            "count": 100,
            "image": "/rewards/void_souls.PNG"
          }
        ]
      },
      {
        "row": 4,
        "col": 2,
        "typeId": "armament_warehouse",
        "tier": "epic",
        "icon": 36
      },
      {
        "row": 4,
        "col": 3,
        "typeId": "central_checkpoint_last",
        "icon": 8
      },
      {
        "row": 4,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 4,
        "col": 5,
        "typeId": "giant_armament_warehouse",
        "tier": "primeval",
        "icon": 80
      }
    ],
    "edges": [
      {
        "from": [
          1,
          4
        ],
        "to": [
          2,
          4
        ]
      },
      {
        "from": [
          2,
          2
        ],
        "to": [
          3,
          2
        ]
      }
    ]
  },
  {
    "area": 5,
    "seedCode": "22312",
    "cols": 7,
    "rows": 5,
    "nodes": [
      {
        "row": 0,
        "col": 1,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "보이드 소울",
            "count": 100,
            "image": "/rewards/void_souls.PNG"
          }
        ]
      },
      {
        "row": 0,
        "col": 2,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 0,
        "col": 3,
        "typeId": "central_checkpoint_start",
        "icon": 0
      },
      {
        "row": 0,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 0,
        "col": 5,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 1,
        "col": 1,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 1,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 1,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 1,
        "col": 4,
        "typeId": "deviated_thousand_seas_sky",
        "icon": 116
      },
      {
        "row": 1,
        "col": 5,
        "typeId": "armament_warehouse",
        "tier": "epic",
        "icon": 36
      },
      {
        "row": 2,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 2,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 2,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 2,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 2,
        "col": 5,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 2,
        "col": 6,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 3,
        "col": 1,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 3,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 3,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 3,
        "col": 4,
        "typeId": "giant_armament_warehouse",
        "tier": "primeval",
        "icon": 80
      },
      {
        "row": 4,
        "col": 1,
        "typeId": "tuner_left_trace",
        "tier": "legendary",
        "icon": 92
      },
      {
        "row": 4,
        "col": 2,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 4,
        "col": 3,
        "typeId": "central_checkpoint_last",
        "icon": 8
      },
      {
        "row": 4,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 5,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "순례의 인장",
            "count": 1000,
            "image": "/rewards/pilgrimage_seal.PNG"
          }
        ]
      }
    ],
    "edges": [
      {
        "from": [
          1,
          4
        ],
        "to": [
          2,
          4
        ]
      },
      {
        "from": [
          3,
          4
        ],
        "to": [
          4,
          4
        ]
      }
    ]
  },
  {
    "area": 5,
    "seedCode": "33122",
    "cols": 7,
    "rows": 5,
    "nodes": [
      {
        "row": 0,
        "col": 2,
        "typeId": "giant_armament_warehouse",
        "tier": "primeval",
        "icon": 80
      },
      {
        "row": 0,
        "col": 3,
        "typeId": "central_checkpoint_start",
        "icon": 0
      },
      {
        "row": 0,
        "col": 4,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 0,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 0,
        "col": 6,
        "typeId": "labyrinth_supply_base",
        "tier": "ticket",
        "icon": 104
      },
      {
        "row": 1,
        "col": 2,
        "typeId": "deviated_thousand_seas_sky",
        "icon": 116
      },
      {
        "row": 1,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 1,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 1,
        "col": 5,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 1,
        "col": 6,
        "typeId": "relic_excavation_zone",
        "icon": 12
      },
      {
        "row": 2,
        "col": 0,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 2,
        "col": 1,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 2,
        "col": 2,
        "typeId": "tuner_left_trace",
        "tier": "legendary",
        "icon": 92
      },
      {
        "row": 2,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 2,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 3,
        "col": 1,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "순례의 인장",
            "count": 1000,
            "image": "/rewards/pilgrimage_seal.PNG"
          }
        ]
      },
      {
        "row": 3,
        "col": 2,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 3,
        "col": 3,
        "typeId": "central_checkpoint",
        "icon": 4
      },
      {
        "row": 3,
        "col": 4,
        "typeId": "labyrinth_supply_base",
        "tier": "key",
        "icon": 124
      },
      {
        "row": 3,
        "col": 5,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 1,
        "typeId": "chaotic_life_pilgrimage",
        "icon": 108,
        "rewards": [
          {
            "nameKr": "보이드 소울",
            "count": 100,
            "image": "/rewards/void_souls.PNG"
          }
        ]
      },
      {
        "row": 4,
        "col": 2,
        "typeId": "armament_warehouse",
        "tier": "epic",
        "icon": 36
      },
      {
        "row": 4,
        "col": 3,
        "typeId": "central_checkpoint_last",
        "icon": 8
      },
      {
        "row": 4,
        "col": 4,
        "typeId": "chaotic_radiance_pilgrimage",
        "icon": 112
      },
      {
        "row": 4,
        "col": 5,
        "typeId": "relic_excavation_zone",
        "icon": 12
      }
    ],
    "edges": [
      {
        "from": [
          0,
          6
        ],
        "to": [
          1,
          6
        ]
      },
      {
        "from": [
          3,
          1
        ],
        "to": [
          4,
          1
        ]
      }
    ]
  }
]
