'use strict';

const ROLE = global.config.custom.roles;

module.exports = {
  trip: {
    _id: {
      type: 'string',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
      },
    },

    __v: {
      type: 'number',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
      },
    },

    destination: {
      type: 'object',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [ROLE.ADMINISTRATOR],
        find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
      },

      attributes: {
        _id: {
          type: 'string',
          required: false,
          permission: {
            create: [ROLE.ADMINISTRATOR],
            update: [ROLE.ADMINISTRATOR],
            find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
          },
        },
    
        name: {
          type: 'string',
          required: true,
          permission: {
            create: [ROLE.ADMINISTRATOR],
            update: [ROLE.ADMINISTRATOR],
            find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
          },
          minLength: 1,
          maxLength: 40,
        },
    
        country: {
          type: 'string',
          required: true,
          permission: {
            create: [ROLE.ADMINISTRATOR],
            update: [ROLE.ADMINISTRATOR],
            find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
          },
          minLength: 1,
          maxLength: 40,
        },
    
        photo: {
          type: 'string',
          required: true,
          permission: {
            create: [ROLE.ADMINISTRATOR],
            update: [ROLE.ADMINISTRATOR],
            find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
          },
          maxLength: 7340032, // 5MB image in binary
        },
    
        tags: {
          type: 'array',
          required: true,
          subType:'string',
          permission: {
            create: [ROLE.ADMINISTRATOR],
            update: [ROLE.ADMINISTRATOR],
            find: [ROLE.ADMINISTRATOR, ROLE.GUEST],
          }
        },
    
        isManual: {
          type: 'boolean',
          required: false,
          permission: {
            create: [ROLE.ADMINISTRATOR],
            update: [ROLE.ADMINISTRATOR],
            find: [ROLE.ADMINISTRATOR]
          }
        },
        
        isEnabled: {
          type: 'boolean',
          required: false,
          permission: {
            create: [ROLE.ADMINISTRATOR],
            update: [ROLE.ADMINISTRATOR],
            find: [ROLE.ADMINISTRATOR]
          }
        }
      }
    },

    departure: {
      type: 'object',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [ROLE.ADMINISTRATOR],
        find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
      },

      attributes: {
        _id: {
          type: 'string',
          required: false,
          permission: {
            create: [ROLE.ADMINISTRATOR],
            update: [ROLE.ADMINISTRATOR],
            find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
          },
        },
    
        name: {
          type: 'string',
          required: true,
          permission: {
            create: [ROLE.ADMINISTRATOR],
            update: [ROLE.ADMINISTRATOR],
            find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
          },
          minLength: 1,
          maxLength: 40,
        },
    
        country: {
          type: 'string',
          required: true,
          permission: {
            create: [ROLE.ADMINISTRATOR],
            update: [ROLE.ADMINISTRATOR],
            find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
          },
          minLength: 1,
          maxLength: 40,
        },
    
        photo: {
          type: 'string',
          required: true,
          permission: {
            create: [ROLE.ADMINISTRATOR],
            update: [ROLE.ADMINISTRATOR],
            find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
          },
          maxLength: 7340032, // 5MB image in binary
        },
    
        tags: {
          type: 'array',
          required: true,
          subType:'string',
          permission: {
            create: [ROLE.ADMINISTRATOR],
            update: [ROLE.ADMINISTRATOR],
            find: [ROLE.ADMINISTRATOR, ROLE.GUEST],
          }
        },
    
        isManual: {
          type: 'boolean',
          required: false,
          permission: {
            create: [ROLE.ADMINISTRATOR],
            update: [ROLE.ADMINISTRATOR],
            find: [ROLE.ADMINISTRATOR]
          }
        },
        
        isEnabled: {
          type: 'boolean',
          required: false,
          permission: {
            create: [ROLE.ADMINISTRATOR],
            update: [ROLE.ADMINISTRATOR],
            find: [ROLE.ADMINISTRATOR]
          }
        }
      }
    },

    fake: {
      type: 'boolean',
      required: false,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [ROLE.ADMINISTRATOR],
        find: [ROLE.ADMINISTRATOR]
      }
    },

    active: {
      type: 'boolean',
      required: false,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [ROLE.ADMINISTRATOR],
        find: [ROLE.ADMINISTRATOR]
      }
    },

    adultPrice: {
      type: 'number',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [ROLE.ADMINISTRATOR],
        find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
      },
      min: 0,
      max: 1000000,
    },

    childPrice: {
      type: 'number',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [ROLE.ADMINISTRATOR],
        find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
      },
      min: 0,
      max: 1000000,
    },

    discount: {
      type: 'number',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [ROLE.ADMINISTRATOR],
        find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
      },
      min: 0,
      max: 100,
    },

    duration: {
      type: 'number',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [ROLE.ADMINISTRATOR],
        find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
      },
      min: 1,
      max: 100000,
    },

    deleted: {
      type: 'boolean',
      required: false,
      permission: {
        create: [],
        update: [],
        find: []
      }
    },

    deselectionPrice: {
      type: 'number',
      required: true,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [ROLE.ADMINISTRATOR],
        find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
      },
      min: 0,
      max: 1000000,
    },

    scheduledTrips: {
      type: 'array',
      subType: 'object',
      required: false,
      permission: {
        create: [ROLE.ADMINISTRATOR],
        update: [ROLE.ADMINISTRATOR],
        find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
      }
    },

    tickets: {
      type: 'array',
      subType: 'string',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR, ROLE.GUEST]
      }
    },

    createdAt: {
      type: 'timestamp',
      required: false,
      permission: {
        create: [],
        update: [],
        find: [ROLE.ADMINISTRATOR]
      }
    }
  }
};
