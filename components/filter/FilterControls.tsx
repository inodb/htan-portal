import _ from "lodash";
import {NextRouter} from "next/router";
import {action} from "mobx";
import {observer} from "mobx-react";
import React from "react";
import Select, {ActionMeta} from "react-select";

import {makeOptions} from "../../lib/filterHelpers";
import {Entity, sortStageOptions, updateSelectedFiltersInURL} from "../../lib/helpers";
import {ExploreOptionType, ExploreSelectedFilter, IFiltersByGroupName, PropMap, PropNames} from "../../lib/types";
import FilterCheckList from "../FilterPanel/FilterCheckList";
import FilterPanel from "../FilterPanel/FilterPanel";
import FilterPropertyColumnShell from "../FilterPanel/FilterPropertyColumn";


interface IFilterControlsProps {
    router: NextRouter;
    setFilter: (groupNames: string[], actionMeta: ActionMeta<ExploreSelectedFilter>) => void;
    selectedFiltersByGroupName: IFiltersByGroupName;
    selectedFilters: ExploreSelectedFilter[];
    files: Entity[];
    getGroupsByProperty: any;
}

const FilterControls: React.FunctionComponent<IFilterControlsProps> = observer(props => {
    const options = (propName: string): ExploreOptionType[] => {
        return makeOptions(propName, props.selectedFiltersByGroupName, props.files, props.getGroupsByProperty);
    }

    const isOptionSelected = (option:ExploreSelectedFilter) => {
        return (
            _.find(props.selectedFilters,
                (o:ExploreSelectedFilter) => o.value === option.value && option.group === o.group
            ) !== undefined
        );
    };

    const handleChange = action((
            value: any,
            actionMeta: ActionMeta<ExploreSelectedFilter>
    ) => {
        let newFilters = props.selectedFilters.filter((o)=>{
            return o.group !== actionMeta!.option!.group! || o.value !== actionMeta!.option!.value!;
        });

        newFilters = newFilters.concat([actionMeta.option!]);

        updateSelectedFiltersInURL(newFilters, props.router);
    });

    return (
        <div className="filterControls">

            <div>
                <div style={{ width: 220 }}>
                    <Select
                        isSearchable
                        isClearable={false}
                        name="searchAll"
                        placeholder="Search all filters"
                        controlShouldRenderValue={false}
                        isMulti={true}
                        options={[
                            PropNames.AtlasName,
                            PropNames.TissueorOrganofOrigin,
                            PropNames.PrimaryDiagnosis,
                            PropNames.Component,
                            PropNames.Stage
                        ].map((propName) => {
                            return {
                                label:
                                PropMap[propName]
                                    .displayName,
                                options: options(
                                    propName
                                ).map((option) =>
                                    Object.assign(option, {
                                        group: propName,
                                    })
                                ),
                            };
                        })}
                        hideSelectedOptions={false}
                        closeMenuOnSelect={false}
                        onChange={handleChange}
                        isOptionSelected={isOptionSelected}
                        value={
                            props.selectedFiltersByGroupName[
                                PropNames.AtlasName
                                ]
                        }
                    />
                </div>
            </div>

            <div>
                <div style={{ width: 220 }}>
                    <FilterPanel placeholder={"Cancer Type"}>
                        <div
                            className={
                                'filter-checkbox-list-container'
                            }
                        >
                            <FilterPropertyColumnShell title={"Cancer Type"}>
                                <FilterCheckList
                                    setFilter={
                                        props.setFilter
                                    }
                                    filters={props.selectedFiltersByGroupName}
                                    options={options(
                                        PropNames.PrimaryDiagnosis
                                    )}
                                />
                            </FilterPropertyColumnShell>
                            <FilterPropertyColumnShell title={"Stage"}>
                                <FilterCheckList
                                    setFilter={
                                        props.setFilter
                                    }
                                    filters={props.selectedFiltersByGroupName}
                                    options={sortStageOptions(options(
                                        PropNames.Stage
                                    ))}
                                />
                            </FilterPropertyColumnShell>

                        </div>
                    </FilterPanel>
                </div>
            </div>

            <div>
                <div style={{ width: 220 }}>
                    <FilterPanel placeholder={"Tissue Type"}>
                        <FilterPropertyColumnShell title={"Tissue Type"}>
                            <FilterCheckList
                                setFilter={
                                    props.setFilter
                                }
                                filters={props.selectedFiltersByGroupName}
                                options={options(
                                    PropNames.TissueorOrganofOrigin
                                )}
                            />
                        </FilterPropertyColumnShell>
                    </FilterPanel>
                </div>
            </div>

            <div>
                <div style={{ width: 220 }}>
                    <FilterPanel placeholder={"Assay Type"}>
                        <FilterPropertyColumnShell title={"Assay Type"}>
                            <FilterCheckList
                                setFilter={
                                    props.setFilter
                                }
                                filters={props.selectedFiltersByGroupName}
                                options={options(
                                    PropNames.Component
                                )}
                            />
                        </FilterPropertyColumnShell>
                    </FilterPanel>
                </div>
            </div>

            <div>
                <div style={{ width: 220 }}>
                    <FilterPanel placeholder={"File Type"}>
                        <FilterPropertyColumnShell title={"File Type"}>
                            <FilterCheckList
                                setFilter={
                                    props.setFilter
                                }
                                filters={props.selectedFiltersByGroupName}
                                options={options(
                                    PropNames.Level
                                )}
                            />
                        </FilterPropertyColumnShell>
                    </FilterPanel>
                </div>
            </div>

        </div>
    )
});

export default FilterControls;