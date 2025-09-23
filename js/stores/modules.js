// @flow

import { AsyncStorage } from 'react-native';
import { action, observable, computed } from 'mobx';
import { create, persist } from 'mobx-persist';
import initialState from '../config/mock.eagle';

const evaluatePercentes = (numOfItems: number, numOfChecked: number) => {
  if (numOfItems) {
    return Math.round((numOfChecked * 100) / numOfItems);
  } else {
    return 0;
  }
};

const CORRECTIVE_STATUSES = [
  "Minor",
  "Major",
  "Critical",
];

class ModulesStore {
  @persist("object") @observable usersInfo = {};
  @observable isHydrated = false;
  @persist @observable token = "";
  @persist @observable email = "";
  @persist @observable name = "";
  @observable fakeModules = [
    // {
    //   id: 1,
    //   title: "Module 1",
    // },
    {
      id: 2,
      title: "Module 2",
    },
    // {
    //   id: 3,
    //   title: "Module 3",
    // },
    // {
    //   id: 4,
    //   title: "Module 4",
    // },
    // {
    //   id: 5,
    //   title: "Module 5",
    // },
    // {
    //   id: 6,
    //   title: "Module 6",
    // },
    // {
    //   id: 7,
    //   title: "Module 7",
    // },
    // {
    //   id: 8,
    //   title: "Module 8",
    // },
    // {
    //   id: 9,
    //   title: "Module 9",
    // },
    // {
    //   id: 10,
    //   title: "Module 10",
    // },
    {
      id: 11,
      title: "Module 11",
    },
    // {
    //   id: 12,
    //   title: "Module 12",
    // },
    // {
    //   id: 13,
    //   title: "Module 13",
    // },
    // {
    //   id: 14,
    //   title: "Module 14",
    // },
    // {
    //   id: 15,
    //   title: "Module 15",
    // },
  ];
  @persist("object") @observable audits = {
    ...initialState.audits,
  };

  @persist("object") @observable submittedAudits = {};

  @observable pickerItems = {
    ...initialState.pickerItems,
  };

  @persist("object") @observable companyInfo = {};

  @persist @observable activeCompany = null;

  @observable modules = {
    ...initialState.modules,
  };

  @observable moduleSections = {
    ...initialState.sections,
  };

  @observable questions = {
    ...initialState.questions,
  };

  @observable activeModule = null;
  @observable activeSection = null;

  @action setHydrated(value: boolean) {
    this.isHydrated = value;
  }

  @action setToken(token: string) {
    this.token = token;
  }

  @action setUserFromCache(email: string) {
    if (this.usersInfo && this.usersInfo[email]) {
      this.audits = {
        ...this.audits,
        ...(this.usersInfo[email].audits || {}),
      };
      this.submittedAudits = {
        ...this.submittedAudits,
        ...(this.usersInfo[email].submittedAudits || {}),
      };
      this.companyInfo = {
        ...this.companyInfo,
        ...(this.usersInfo[email].companyInfo || {}),
      };
      this.activeCompany = this.usersInfo[email].activeCompany;
    }
  }

  @action setEmail(email: string) {
    this.email = email;
  }

  @action setName(name: string) {
    this.name = name;
  }

  @action setActiveCompany(companyId: string) {
    this.activeCompany = companyId;
    if (!this.companyInfo[companyId]) {
      this.companyInfo = {
        ...this.companyInfo,
        [companyId]: {
          modules: {
            ...initialState.modules,
          },
          moduleSections: {
            ...initialState.sections,
          },
          questions: {
            ...initialState.questions,
          },
        },
      };
    }
  }

  @action resetActiveCompany(companyId: string) {
    this.companyInfo = {
      ...this.companyInfo,
      [companyId]: {
        modules: {
          ...initialState.modules,
        },
        moduleSections: {
          ...initialState.sections,
        },
        questions: {
          ...initialState.questions,
        },
      },
    };
  }

  @action addAudit(item: {}) {
    const id = Math.floor(Math.random() * (1000000 - 4)) + 4;
    this.audits = {
      ...this.audits,
      [id]: {
        ...item,
        name: item.name,
        title: item.name,
        companyNumber: item.companyNumber,
        auditNumber: item.auditNumber,
        startDate: item.startDate,
        endDate: item.endDate,
        auditDue: '',
        description: '',
        fullDescription: '',
        place: '',
        modules: {
          module2: true,
          module11: true,
        },
      },
    };

    this.setActiveCompany(id);
  }

  @action updateAudit(id: number, item: {}) {
    if (this.audits && this.audits[id]) {
      this.audits = {
        ...this.audits,
        [id]: {
          ...this.audits[id],
          ...item,
        },
      };
    }
  }

  @action moveAuditToSubmitted(id: string) {
    this.submittedAudits = {
      ...this.submittedAudits,
      [id]: {
        ...this.audits[id],
      },
    };
  }

  @action deleteAudit(id: string) {
    const local = {
      ...this.audits,
    };

    delete local[id];

    this.audits = {
      ...local,
    };
  }

  @action logout() {
    const audits = JSON.parse(JSON.stringify(this.audits));
    const submittedAudits = JSON.parse(JSON.stringify(this.submittedAudits));
    const companyInfo = JSON.parse(JSON.stringify(this.companyInfo));
    this.usersInfo = {
      ...this.usersInfo,
      [this.email]: {
        audits,
        submittedAudits,
        companyInfo,
        activeCompany: this.activeCompany,
      },
    };

    this.token = "";
    this.email = "";
    this.name = "";
    this.modules = {
      ...initialState.modules,
    };
    this.audits = {
      ...initialState.audits,
    };

    this.submittedAudits = {};

    this.moduleSections = {
      ...initialState.sections,
    };

    this.questions = {
      ...initialState.questions,
    };

    this.activeModule = null;
    this.activeSubmodule = null;
    this.activeSection = null;

    this.companyInfo = {};

    this.activeCompany = null;
  }

  @action clearStore() {
    this.modules = {
      ...initialState.modules,
    };
    this.moduleSections = {
      ...initialState.sections,
    };

    this.questions = {
      ...initialState.questions,
    };

    this.activeModule = null;
    this.activeSubmodule = null;
    this.activeSection = null;
  }

  @action checkQuestion(mId: string, smId: string, sId: string, qId: string, value: string, info: {}) {
    const idsExist = mId && smId && sId && qId;
    const questions = this.companyInfo[this.activeCompany].questions;
    if (idsExist &&
      (questions[mId]) &&
      (questions[mId][smId]) &&
      (questions[mId][smId][sId]) &&
      questions[mId][smId][sId][qId]
    ) {
      questions[mId][smId][sId][qId] = {
        ...questions[mId][smId][sId][qId],
        isActive: value,
        ...info,
      };
    }
  }

  @action setActiveModule(id: string) {
    this.activeModule = id;
  }

  @action setActiveSubmodule(id: string) {
    this.activeSubmodule = id;
  }

  @action setActiveSection(id: string) {
    this.activeSection = id;
  }

  @action checkQuestionAsSolved(
    mId: string,
    smId: string,
    ssmId: string,
    qId: string
  ) {
    // const questions = this.companyInfo[this.activeCompany].questions;
    // const keys = Object.keys(questions);
    // keys.map((key: string) => {
    //   const qKeys = Object.keys(questions[key]);
    //   qKeys.map((qKey: string) => {
    //     const subQKeys = Object.keys(questions[key][qKey]);
    //     subQKeys.map((subQKey: string) => {
    //       if (subQKey === qId) {
    //         delete questions[key][qKey][subQKey].points;
    //         delete questions[key][qKey][subQKey].corrective;
    //         delete questions[key][qKey][subQKey].additional;
    //         delete questions[key][qKey][subQKey].status;
    //       }
    //     });
    //   });
    // });
    this.companyInfo[this.activeCompany].questions = {
      ...this.companyInfo[this.activeCompany].questions,
      [mId]: {
        ...this.companyInfo[this.activeCompany].questions[mId],
        [smId]: {
          ...this.companyInfo[this.activeCompany].questions[mId][smId],
          [ssmId]: {
            ...this.companyInfo[this.activeCompany].questions[mId][smId][ssmId],
            [qId]: {
              ...this.companyInfo[this.activeCompany].questions[mId][smId][ssmId][qId],
              selected: true,
            },
          },
        },
      },
    };
  }

  @computed get requestBody() {
    const activeAudit = this.audits[this.activeCompany];
    const {
      openingMeeting: oM,
      closingMeeting: cM,
    } = activeAudit;
    const modules = {};
    const questions = this.companyInfo[this.activeCompany].questions;
    const keys = Object.keys(questions);
    keys.map((key: string) => {
      modules[key] = {};
      const qKeys = Object.keys(questions[key]);
      qKeys.map((qKey: string) => {
        modules[key][qKey] = {};
        const subQKeys = Object.keys(questions[key][qKey]);
        subQKeys.map((subQKey: string) => {
          modules[key][qKey][subQKey] = {};
          const lowQKeys = Object.keys(questions[key][qKey][subQKey]);
          lowQKeys.map((lowQKey: string) => {
            if (lowQKey === "Section Summary") {
              modules[key][qKey][subQKey][lowQKey] = questions[key][qKey][subQKey][lowQKey].sectionSummary || "";
            } else {
              modules[key][qKey][subQKey][lowQKey] = {
                "corrective": questions[key][qKey][subQKey][lowQKey].corrective || "",
                "additional": questions[key][qKey][subQKey][lowQKey].additional || "",
                "primary": questions[key][qKey][subQKey][lowQKey].points || "",
                "evidence": questions[key][qKey][subQKey][lowQKey].evidence || "",
              };
            }
          });
        });
      });
    });

    return {
      "name": `Audit #${activeAudit.auditNumber}`,
      "companyName": activeAudit.name,
      "companyNumber": activeAudit.companyNumber,
      "auditNumber": activeAudit.auditNumber,
      "city": activeAudit.city,
      "state": activeAudit.state,
      "startDate": activeAudit.startDate,
      "endDate": activeAudit.endDate,
      "totalScore": this.totalScore,
      "practitionerEmail": this.email,
      "openingMeetingPresent": oM ? oM.peoples.map(item =>
        `${item.name}: ${item.position}`) : "",
      "closingMeetingPresent": cM ? cM.peoples.map(item =>
        `${item.name}: ${item.position}`) : "",
      "auditorRecommendation": cM ? cM.recommendation : "",
      "facilityDescription": {
        "numberOfEmployees": oM ? oM.numberOfEmployees : "0",
        "size": oM ? oM.facility : "0",
        "productionSchedule": oM ? oM.schedule : "",
        "other": oM ? oM.other : "",
      },
      "modules": modules,
    };
  }

  getModuleStat(mId: string, aId: string) {
    return computed(() => {
      const companyId = aId || this.activeCompany;
      let questionNumber = 0;
      let checkedNumber = 0;
      let percents = 0;
      if (this.companyInfo[companyId]) {
        const moduleSections = this.companyInfo[companyId].moduleSections;
        const questions = this.companyInfo[companyId].questions;
        if (!moduleSections[mId]) {
          return {
            questionNumber,
            checkedNumber,
            percents,
          };
        }

        moduleSections[mId].map((item: {}) => {
          if (item && item.submodules) {
            item.submodules.forEach((sItem: {}) => {
              let keys = [];
              const checked = [];
              if (mId && item.id && sItem.id && (questions[mId]) && (questions[mId][item.id]) && (questions[mId][item.id][sItem.id])) {
                keys = Object.keys(questions[mId][item.id][sItem.id]);
                keys.map((key: string) => {
                  if (questions[mId][item.id][sItem.id][key].isActive) {
                    checked.push(questions[mId][item.id][sItem.id][key]);
                  }
                });
              }
              questionNumber += keys.length;
              checkedNumber += checked.length;
            });
          }
        });
        percents = evaluatePercentes(questionNumber, checkedNumber);
      }

      return {
        questionNumber,
        checkedNumber,
        percents,
      };
    }).get();
  }

  getModulePoints(mId: string) {
    return computed(() => {
      const moduleSections = this.companyInfo[this.activeCompany].moduleSections;
      const questions = this.companyInfo[this.activeCompany].questions;

      if (!moduleSections[mId]) {
        return 0;
      }
      let points = 0;
      moduleSections[mId].map((item: {}) => {
        if (item && item.submodules) {
          item.submodules.forEach((sItem: {}) => {
            let keys = [];
            if (mId && item.id && sItem.id && (questions[mId]) && (questions[mId][item.id]) && (questions[mId][item.id][sItem.id])) {
              keys = Object.keys(questions[mId][item.id][sItem.id]);
              keys.map((key: string) => {
                if (questions[mId][item.id][sItem.id][key].points) {
                  points += questions[mId][item.id][sItem.id][key].points;
                }
              });
            }
          });
        }
      });
      return points;
    }).get();
  }

  getSubModulePoints(mId: string, smId: string) {
    return computed(() => {
      const moduleSections = this.companyInfo[this.activeCompany].moduleSections;
      const questions = this.companyInfo[this.activeCompany].questions;

      if (!moduleSections[mId]) {
        return 0;
      }
      let points = 0;
      // moduleSections[mId].map((item: {}) => {
      let keys = [];
      if (mId && smId && (questions[mId]) && (questions[mId][smId])) {
        keys = Object.keys(questions[mId][smId]);
        keys.map((key: string) => {
          if (questions[mId][smId][key].points) {
            points += questions[mId][smId][key].points;
          }
        });
      }
      // });
      return points;
    }).get();
  }

  @computed get list() {
    const list = [];
    const modules = this.companyInfo[this.activeCompany].modules;
    const keys = Object.keys(modules);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      list.push({
        ...modules[key],
        id: key,
        // percents: this.getModuleStat(key).percents,
        percents: this.allModuleQuestions(key, key).percents,
      });
    }

    return list;
  }

  allModuleQuestions(mId: string, module: string) {
    return computed(() => {
      const companyId = this.activeCompany;
      let questionNumber = 0;
      let checkedNumber = 0;
      let percents = 0;

      if (this.companyInfo[companyId]) {
        const moduleSections = this.companyInfo[companyId].moduleSections;
        const questions = this.companyInfo[companyId].questions;

        if (!moduleSections[mId]) {
          return {
            questionNumber,
            checkedNumber,
            percents,
          };
        }

        moduleSections[mId].map((item: {}) => {
          if (item && item.submodules) {
            item.submodules.forEach((sItem: {}) => {
              let keys = [];
              const checked = [];
              if (mId && item.id && sItem.id && (questions[mId]) && (questions[mId][item.id][sItem.id])) {
                keys = Object.keys(questions[mId][item.id][sItem.id]);
                keys.map((key: string) => {
                  if (questions[mId][item.id][sItem.id][key].isActive) {
                    checked.push(questions[mId][item.id][sItem.id][key]);
                  }
                });
              }
              questionNumber += keys.length;
              checkedNumber += checked.length;
            });
          }
        });
        const mSKeys = Object.keys(moduleSections);

        mSKeys.map((sKey: string) => {
          if (sKey === mId) {
            moduleSections[sKey].map((section: {}) => {
              if (section && section.submodules) {
                section.submodules.forEach((sItem: {}) => {
                  let keys = [];
                  const checked = [];
                  if (sKey && section.id && sItem.id && (questions[sKey]) && (questions[sKey][section.id][sItem.id])) {
                    keys = Object.keys(questions[sKey][section.id][sItem.id]);
                    keys.map((key: string) => {
                      if (questions[sKey][section.id][sItem.id][key].module === module) {
                        questionNumber += 1;
                        if (questions[sKey][section.id][sItem.id][key].isActive) {
                          checked.push(questions[sKey][section.id][sItem.id][key]);
                        }
                      }
                    });
                  }
                  checkedNumber += checked.length;
                });
              }
            });
          }
        });
        percents = evaluatePercentes(questionNumber, checkedNumber);
      }

      return {
        questionNumber,
        checkedNumber,
        percents,
      };
    }).get();
  }

  getSectionStat(sId: string) {
    return computed(() => {
      const questions = this.companyInfo[this.activeCompany].questions;
      if (this.activeModule && sId && (questions[this.activeModule]) && (questions[this.activeModule][sId])) {
        const checked = [];
        let questionsNum = 0;
        const sKeys = Object.keys(questions[this.activeModule][sId]);
        sKeys.forEach((sKey: string) => {
          const qKeys = Object.keys(questions[this.activeModule][sId][sKey]);
          questionsNum += qKeys.length;
          qKeys.forEach((qKey: string) => {
            if (questions[this.activeModule][sId][sKey][qKey].isActive) {
              checked.push(questions[this.activeModule][sId][sKey][qKey]);
            }
          });
        });
        return evaluatePercentes(questionsNum, checked.length);
      } else {
        return 0;
      }
    }).get();
  }

  getSubSectionStat(id: string, sId: string) {
    return computed(() => {
      const questions = this.companyInfo[this.activeCompany].questions;

      if (
        this.activeModule &&
        id &&
        sId &&
        (questions[this.activeModule]) &&
        (questions[this.activeModule][id]) &&
        (questions[this.activeModule][id][sId])
      ) {
        const checked = [];
        let questionsNum = 0;
        // const sKeys = Object.keys(questions[this.activeModule][sId]);
        // sKeys.forEach((sKey: string) => {
        const qKeys = Object.keys(questions[this.activeModule][id][sId]);
        questionsNum += qKeys.length;
        qKeys.forEach((qKey: string) => {
          if (questions[this.activeModule][id][sId][qKey].isActive) {
            checked.push(questions[this.activeModule][id][sId][qKey]);
          }
        });
        // });
        return evaluatePercentes(questionsNum, checked.length);
      } else {
        return 0;
      }
    }).get();
  }

  getModule(mId: string) {
    return computed(() => {
      const modules = this.companyInfo[this.activeCompany].modules;
      return modules[mId];
    }).get();
  }

  getSectionQuestions(sId: string) {
    return computed(() => {
      const questions = this.companyInfo[this.activeCompany].questions;

      if (this.activeModule &&
        this.activeSubmodule &&
        sId &&
        (questions[this.activeModule]) &&
        (questions[this.activeModule][this.activeSubmodule]) &&
        (questions[this.activeModule][this.activeSubmodule][sId])) {
        return questions[this.activeModule][this.activeSubmodule][sId];
      } else {
        return {};
      }
    }).get();
  }

  getModuleSections(mId: string) {
    return computed(() => {
      const moduleSections = this.companyInfo[this.activeCompany].moduleSections;
      return moduleSections[mId].map((item: {}) => ({
        ...item,
        percents: this.getSectionStat(item.id),
        points: this.getSubModulePoints(mId, item.id),
      }));
    }).get();
  }

  getModuleSubsections(mId: string, smId: string) {
    return computed(() => {
      const moduleSections = this.companyInfo[this.activeCompany].moduleSections;
      const filtered = moduleSections[mId].filter(item => item.id === smId);

      return filtered[0].submodules.map((item: {}) => {
        return {
          ...item,
          percents: this.getSubSectionStat(filtered[0].id, item.id),
          // points: this.getSubModulePoints(mId, item.id),
        };
      });
    }).get();
  }

  @computed get auditList() {
    const keys = Object.keys(this.audits);

    return keys.map((key: string) => {
      return {
        ...this.audits[key],
        id: key,
      };
    });
  }

  @computed get inProgressAuditList() {
    const keys = Object.keys(this.audits);
    return keys.map((key: string) => {
      let questionNumber = 0;
      let checkedNumber = 0;
      if (this.audits[key] && this.audits[key].modules) {
        const mKeys = Object.keys(this.audits[key].modules);
        mKeys.map((mKey: string) => {
          const result = this.getModuleStat(mKey, key);

          questionNumber += result.questionNumber;
          checkedNumber += result.checkedNumber;
        });
      }
      return {
        ...this.audits[key],
        id: key,
        percents: evaluatePercentes(questionNumber, checkedNumber),
      };
    });
  }

  @computed get submittedAuditList() {
    const keys = Object.keys(this.submittedAudits);
    return keys.map((key: string) => {
      let questionNumber = 0;
      let checkedNumber = 0;
      if (this.submittedAudits[key] && this.submittedAudits[key].modules) {
        const mKeys = Object.keys(this.submittedAudits[key].modules);
        mKeys.map((mKey: string) => {
          const result = this.getModuleStat(mKey, key);

          questionNumber += result.questionNumber;
          checkedNumber += result.checkedNumber;
        });
      }
      return {
        ...this.submittedAudits[key],
        id: key,
        percents: evaluatePercentes(questionNumber, checkedNumber),
      };
    });
  }

  @computed get pendingAudits() {
    const keys = Object.keys(this.audits);

    return keys.map((key: string) => {
      return {
        ...this.audits[key],
        id: key,
      };
    });
  }

  @computed get pickerList() {
    const keys = Object.keys(this.pickerItems);

    return keys.map((key: string) => {
      return {
        ...this.pickerItems[key],
        id: key,
      };
    });
  }

  @computed get pickerListIds() {
    const keys = Object.keys(this.pickerItems);

    return keys;
  }

  getAuditModules(aId: string) {
    return computed(() => {
      if (aId && this.audits && this.audits[aId]) {
        const audit = this.audits[aId];
        const moduleKeys = audit.modules ? Object.keys(audit.modules) : [];
        const modules = this.list;

        return modules.filter((item: {}) => {
          return moduleKeys.indexOf(item.id) > -1;
        });
      } else {
        return [];
      }
    }).get();
  }

  getAuditPendingActions(aId: string) {
    return computed(() => {
      if (aId && this.audits && this.audits[aId]) {
        const audit = this.audits[aId];
        const moduleKeys = audit.modules ? Object.keys(audit.modules) : [];
        const modules = this.list;
        return modules.filter((item: {}) => {
          return moduleKeys.indexOf(item.id) > -1;
        });
      } else {
        return [];
      }
    }).get();
  }


  @computed get totalScore() {
    const modules = this.companyInfo[this.activeCompany].modules;
    const keys = Object.keys(modules);
    let pointSummary = 0;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      pointSummary += this.getModulePoints(key);
    }

    return 100 + pointSummary;
  }

  isMandatorySubmoduleSubmitted(mId: string) {
    return computed(() => {
      const moduleSections = this.companyInfo[this.activeCompany].moduleSections;
      const questions = this.companyInfo[this.activeCompany].questions;

      if (!moduleSections[mId]) {
        return true;
      }
      let status = true;
      moduleSections[mId].map((item: {}) => {
        if (item && item.submodules) {
          item.submodules.forEach((sItem: {}) => {
            let keys = [];
            if (mId && item.id && sItem.id && (questions[mId]) && (questions[mId][item.id]) && (questions[mId][item.id][sItem.id])) {
              keys = Object.keys(questions[mId][item.id][sItem.id]);
              keys.map((key: string) => {
                const finalItem = questions[mId][item.id][sItem.id][key];
                if (finalItem.mandatory && !finalItem.isActive) {
                  status = false;
                }
              });
            }
          });
        }
      });
      return status;
    }).get();
  }

  @computed get mandatorySubmitted() {
    const modules = this.companyInfo[this.activeCompany].modules;
    const keys = Object.keys(modules);

    const modulesMandatoryCheck = keys.map((key: string) => {
      return this.isMandatorySubmoduleSubmitted(key);
    });
    const filtered = modulesMandatoryCheck.filter(check => !!check);
    return modulesMandatoryCheck.length === filtered.length;
  }

  @computed get getAuditQuestions() {
    const questions = this.companyInfo[this.activeCompany].questions;
    const keys = Object.keys(questions);
    const result = [];
    keys.map((key: string) => {
      const qKeys = Object.keys(questions[key]);
      qKeys.map((qKey: string) => {
        const subQKeys = Object.keys(questions[key][qKey]);
        subQKeys.map((subQKey: string) => {
          const deppQKeys = Object.keys(questions[key][qKey][subQKey]);
          deppQKeys.map((dQKey: string) => {
            if (
              questions[key][qKey][subQKey][dQKey].isActive &&
              questions[key][qKey][subQKey][dQKey].status &&
              CORRECTIVE_STATUSES.indexOf(questions[key][qKey][subQKey][dQKey].status) !== -1
            ) {
              result.push({
                ...questions[key][qKey][subQKey][dQKey],
                uniqueKey: `${key}-${qKey}-${subQKey}-${dQKey}`,
                mId: key,
                smId: qKey,
                ssmId: subQKey,
                id: dQKey,
              });
            }
          });
        });
      });
    });

    return result;
  }
}

const hydrate = create({
  storage: AsyncStorage,
});

const modulesStore = new ModulesStore();

export default modulesStore;

hydrate('modules', modulesStore)
  .then(() => modulesStore.setHydrated(true));
